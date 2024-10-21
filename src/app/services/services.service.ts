import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Comic } from 'src/app/home/home.page';

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
  async obtenerComics(): Promise<Comic[]> {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return Promise.resolve([]); // Retorna un array vacío si la base de datos no está disponible
    }
  
    const query = 'SELECT * FROM COMIC'; // Asegúrate de que el nombre de la tabla sea correcto
    const response: Comic[] = [];
  
    try {
      const res = await this.database.executeSql(query, []);
  
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          const comic: Comic = {
            title: res.rows.item(i).NOMBRE, // Asegúrate de que el nombre de la propiedad coincida con la interfaz
            subtitle: '', // Puedes llenar esto si tienes un subtítulo
            description: '', // Llenar según tus necesidades
            price: res.rows.item(i).PRECIO_UNITARIO,
            author: '', // Llenar según tus necesidades
            illustrator: '', // Llenar según tus necesidades
            editor: '', // Llenar según tus necesidades
            publishDate: res.rows.item(i).ANO_PUBLICACION,
            image: res.rows.item(i).IMAGEN
          };
          response.push(comic);
        }
        console.log('Cómics recuperados: ', response);
      } else {
        console.log('No se encontraron cómics.');
      }
  
      return response; // Retorna la lista de cómics
    } catch (e) {
      console.error('Error al obtener cómics:', e);
      throw e; // Lanza el error para manejarlo en el componente
    }
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
  
    // Limpiar los valores para evitar problemas con espacios en blanco
    correo = correo.trim();
    contrasena = contrasena.trim();
  
    const query = 'SELECT * FROM USUARIO WHERE CORREO = ? AND CONTRASENA = ?';
    try {
      console.log('Consulta:', query);
      console.log('Parámetros:', [correo, contrasena]);
  
      const res = await this.database.executeSql(query, [correo, contrasena]);
      console.log('Resultado de la consulta:', res);
  
      if (res.rows.length > 0) {
        return {
          id: res.rows.item(0).ID,
          nombreCompleto: res.rows.item(0).NOMBRE_COMPLETO,
          telefono: res.rows.item(0).TELEFONO,
          correo: res.rows.item(0).CORREO
        };
      } else {
        console.log('No se encontró el usuario.');
        return null; // Retorna null si no se encontró el usuario
      }
    } catch (e) {
      console.log('Error al obtener el usuario: ' + JSON.stringify(e));
      throw e; // Lanza el error para manejarlo en el componente
    }
  }
  

  // Otros métodos...
}
