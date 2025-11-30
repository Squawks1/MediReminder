import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dbservice {

  private db!: SQLiteObject;

  // Observable
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite, 
    private toastController: ToastController,
    private platform: Platform
  ) {
    this.initDatabase();
  }

  async initDatabase() {
    await this.platform.ready();

    this.sqlite.create({
      name: 'medireminder.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
    }).catch(error => {
      console.log(error);
      this.presentToast("Error al crear la BD: " + error);
    });
  }

  async createTables() {
    try {

      // Tabla usuarios
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS usuarios(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          usuario TEXT,
          password TEXT,
          email TEXT
        )`, []
      );

      // Tabla medicamentos
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS medicamentos(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT,
          dosis TEXT,
          horario TEXT
        )`, []
      );

      // Tabla recordatorios
      await this.db.executeSql(
        `CREATE TABLE IF NOT EXISTS recordatorios(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          titulo TEXT,
          fecha TEXT,
          descripcion TEXT
        )`, []
      );

      this.isDBReady.next(true);
      this.presentToast('Base de datos lista');

    } catch (error) {
      this.presentToast('Error al crear las tablas: ' + error);
    }
  }

  // BD lista y armada
  dbReady() {
    return this.isDBReady.asObservable();
  }

  // Función toast para mostrar alerta/mensaje
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  validarUsuario(usuario: string, password: string) {
    return this.db.executeSql('SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, password]).then((res) => {
        if (res.rows.length > 0) {
          return res.rows.item(0); // Retorna primer usuario que coincide
        } else {
          return null; // Si no hace match, retorna null
        }
      })
      .catch(error => this.presentToast('Error al obtener al usuario:' + error));
  }

  // CRUD Usuarios

  crearUsuario(nombre: string, usuario: string, password: string, email: string) {
    return this.db.executeSql(
      'INSERT INTO usuarios (nombre, usuario, password, email) VALUES (?, ?, ?, ?)',
      [nombre, usuario, password, email]
    );
  }

  obtenerUsuarios() {
    return this.db.executeSql('SELECT * FROM usuarios', []).then(res => {
      let usuarios = [];
      for (let i = 0; i < res.rows.length; i++) {
        usuarios.push(res.rows.item(i));
      }
      return usuarios;
    });
  }

  actualizarUsuario(id: number, nombre: string, usuario: string, password: string, email: string) {
    return this.db.executeSql(
      'UPDATE usuarios SET nombre = ?, usuario = ?, password = ?, email = ? WHERE id = ?',
      [nombre, usuario, password, email, id]
    );
  }

  eliminarUsuario(id: number) {
    return this.db.executeSql('DELETE FROM usuarios WHERE id = ?', [id]);
  }

  // CRUD Medicamentos

  crearMedicamento(nombre: string, dosis: string, horario: string) {
    return this.db.executeSql(
      'INSERT INTO medicamentos (nombre, dosis, horario) VALUES (?, ?, ?)',
      [nombre, dosis, horario]
    );
  }

  obtenerMedicamentos() {
    return this.db.executeSql('SELECT * FROM medicamentos', []).then(res => {
      const lista: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        lista.push(res.rows.item(i));
      }
      return lista;
    })
    .catch(e => this.presentToast("Error al obtener medicamentos: " + e));
  }


  actualizarMedicamento(id: number, nombre: string, dosis: string, horario: string) {
    return this.db.executeSql(
      'UPDATE medicamentos SET nombre = ?, dosis = ?, horario = ? WHERE id = ?',
      [nombre, dosis, horario, id]
    );
  }

  eliminarMedicamento(id: number) {
    return this.db.executeSql('DELETE FROM medicamentos WHERE id = ?', [id]);
  }

  // CRUD Recordatorios

  crearRecordatorio(titulo: string, fecha: string, descripcion: string) {
    return this.db.executeSql(
      'INSERT INTO recordatorios (titulo, fecha, descripcion) VALUES (?, ?, ?)',
      [titulo, fecha, descripcion]
    );
  }

  obtenerRecordatorios() {
    return this.db.executeSql('SELECT * FROM recordatorios', []).then(res => {
      let recs = [];
      for (let i = 0; i < res.rows.length; i++) {
        recs.push(res.rows.item(i));
      }
      return recs;
    });
  }

  actualizarRecordatorio(id: number, titulo: string, fecha: string, descripcion: string) {
    return this.db.executeSql(
      'UPDATE recordatorios SET titulo = ?, fecha = ?, descripcion = ? WHERE id = ?',
      [titulo, fecha, descripcion, id]
    );
  }

  eliminarRecordatorio(id: number) {
    return this.db.executeSql('DELETE FROM recordatorios WHERE id = ?', [id]);
  }

}

