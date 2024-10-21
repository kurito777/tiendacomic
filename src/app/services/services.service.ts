import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  public database!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'nombredelaBD.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        console.log('Ha ocurrido un error al crear la Base de Datos: ' + JSON.stringify(e));
      });
    });
  }

  crearTablas() {
    let queries = [
      `CREATE TABLE IF NOT EXISTS USUARIO (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NOMBRE_COMPLETO VARCHAR(100) NOT NULL,
        TELEFONO VARCHAR(15) NOT NULL,
        CORREO VARCHAR(100) NOT NULL,
        CONTRASENA VARCHAR(100) NOT NULL
      );`,
      // Otras tablas...
    ];

    queries.forEach((query) => {
      this.database.executeSql(query, []).then(() => {
        console.log('Tabla creada correctamente.');
      }).catch(e => {
        console.log('Error al crear tabla: ' + JSON.stringify(e));
      });
    });
  }

  insertarUsuario(nombreCompleto: string, telefono: string, correo: string, contrasena: string) {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return;
    }
  
    let queryExistencia = 'SELECT * FROM USUARIO WHERE CORREO = ? OR NOMBRE_COMPLETO = ?';
    return this.database.executeSql(queryExistencia, [correo, nombreCompleto])
      .then(res => {
        if (res.rows.length > 0) {
          console.log('El usuario ya existe.');
          throw new Error('El usuario ya existe con este correo o nombre.');
        } else {
          let query = 'INSERT INTO USUARIO (NOMBRE_COMPLETO, TELEFONO, CORREO, CONTRASENA) VALUES (?, ?, ?, ?);';
          return this.database.executeSql(query, [nombreCompleto, telefono, correo, contrasena])
            .then(() => {
              console.log('Usuario insertado.');
            });
        }
      }).catch(e => {
        console.log('Error al insertar usuario: ' + JSON.stringify(e));
        throw e; 
      });
  }

  async obtenerUsuario(correo: string, contrasena: string) {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return null; // Retorna null si la base de datos no está disponible
    }

    const query = 'SELECT * FROM USUARIO WHERE CORREO = ? AND CONTRASENA = ?';
    try {
      const res = await this.database.executeSql(query, [correo, contrasena]);

      if (res.rows.length > 0) {
        return {
          id: res.rows.item(0).ID,
          nombreCompleto: res.rows.item(0).NOMBRE_COMPLETO,
          telefono: res.rows.item(0).TELEFONO,
          correo: res.rows.item(0).CORREO
        };
      } else {
        return null; // Retorna null si no se encontró el usuario
      }
    } catch (e) {
      console.log('Error al obtener el usuario: ' + JSON.stringify(e));
      throw e; // Lanza el error para manejarlo en el componente
    }
  }

  // Otros métodos...
}
