import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
      // Tabla Usuario
      `CREATE TABLE IF NOT EXISTS USUARIO (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NOMBRE_COMPLETO VARCHAR(100) NOT NULL,
        TELEFONO VARCHAR(15) NOT NULL,
        CORREO VARCHAR(100) NOT NULL,
        CONTRASENA VARCHAR(100) NOT NULL
      );`,
      // Tabla Rol
      `CREATE TABLE IF NOT EXISTS ROL (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(50) NOT NULL
      );`,
      // Tabla Comic
      `CREATE TABLE IF NOT EXISTS COMIC (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(100) NOT NULL,
        ANO_PUBLICACION INTEGER NOT NULL,
        NBN VARCHAR(50),
        IMAGEN TEXT,
        PRECIO_UNITARIO REAL NOT NULL
      );`,
      // Tabla Editorial
      `CREATE TABLE IF NOT EXISTS EDITORIAL (
        NOMBRE VARCHAR(100) PRIMARY KEY
      );`,
      // Tabla Autores
      `CREATE TABLE IF NOT EXISTS AUTORES (
        NOMBRE_COMPLETO VARCHAR(100) PRIMARY KEY
      );`,
      // Tabla Carro
      `CREATE TABLE IF NOT EXISTS CARRO (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        PRECIO REAL NOT NULL,
        CANTIDAD INTEGER NOT NULL
      );`,
      // Tabla Admin (deriva de Usuario)
      `CREATE TABLE IF NOT EXISTS ADMIN (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(100) NOT NULL,
        TELEFONO VARCHAR(15) NOT NULL,
        CORREO VARCHAR(100) NOT NULL,
        CONTRASENA VARCHAR(100) NOT NULL
      );`,
      // Tabla Cliente (deriva de Usuario)
      `CREATE TABLE IF NOT EXISTS CLIENTE (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NOMBRE VARCHAR(100) NOT NULL,
        TELEFONO VARCHAR(15) NOT NULL,
        CORREO VARCHAR(100) NOT NULL,
        CONTRASENA VARCHAR(100) NOT NULL
      );`
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
    let query = 'INSERT INTO USUARIO (NOMBRE_COMPLETO, TELEFONO, CORREO, CONTRASENA) VALUES (?, ?, ?, ?);';
    return this.database.executeSql(query, [nombreCompleto, telefono, correo, contrasena])
      .then(() => {
        console.log('Usuario insertado.');
      }).catch(e => {
        console.log('Error al insertar usuario: ' + JSON.stringify(e));
      });
  }

  insertarComic(nombre: string, anoPublicacion: number, nbn: string, imagen: string, precioUnitario: number) {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return;
    }
    let query = 'INSERT INTO COMIC (NOMBRE, ANO_PUBLICACION, NBN, IMAGEN, PRECIO_UNITARIO) VALUES (?, ?, ?, ?, ?);';
    return this.database.executeSql(query, [nombre, anoPublicacion, nbn, imagen, precioUnitario])
      .then(() => {
        console.log('Comic insertado.');
      }).catch(e => {
        console.log('Error al insertar comic: ' + JSON.stringify(e));
      });
  }

  // ELIMINAR OBJETO POR NOMBRE
  eliminarObjetoPorNombre(nombreCompleto: string) {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return;
    }
    let query = 'DELETE FROM USUARIO WHERE NOMBRE_COMPLETO = ?';
    return this.database.executeSql(query, [nombreCompleto])
      .then(() => {
        console.log('Usuario eliminado correctamente.');
      }).catch(e => {
        console.log('Error al eliminar usuario: ' + JSON.stringify(e));
      });
  }

  // ACTUALIZAR OBJETO
  actualizarObjeto(nombreAnterior: string, nuevoNombre: string) {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return;
    }
    let query = 'UPDATE USUARIO SET NOMBRE_COMPLETO = ? WHERE NOMBRE_COMPLETO = ?';
    return this.database.executeSql(query, [nuevoNombre, nombreAnterior])
      .then(() => {
        console.log('Usuario actualizado correctamente.');
      }).catch(e => {
        console.log('Error al actualizar usuario: ' + JSON.stringify(e));
      });
  }

  // RECUPERAR OBJETOS DE UNA TABLA
  obtenerObjetos() {
    if (!this.database) {
      console.error('La base de datos no está disponible aún.');
      return;
    }
    let query = 'SELECT * FROM USUARIO';
    let response: any[] = [];
    return this.database.executeSql(query, []).then((res) => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          let obj = {
            nombreCompleto: res.rows.item(i).NOMBRE_COMPLETO,
            telefono: res.rows.item(i).TELEFONO,
            correo: res.rows.item(i).CORREO
          };
          response.push(obj);
        }
        console.log('Usuarios recuperados: ', response);
      } else {
        console.log('No se encontraron usuarios.');
      }
    }).catch(e => {
      console.log('Error al obtener usuarios: ' + JSON.stringify(e));
    });
  }

}
