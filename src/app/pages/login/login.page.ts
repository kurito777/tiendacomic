import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  correo: string = '';
  password: string = '';

  cliente = {
    nombre: 'cliente',
    correo: 'cliente@correo.com',
    password: 'Cliente@123'
  };

  administrador = {
    nombre: 'admin',
    correo: 'admin@correo.com',
    password: 'Admin@123'
  };

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password: string): boolean {
    // Cambiada la expresión regular para requerir solo una mayúscula y mínimo 6 caracteres
    const re = /^(?=.*[A-Z]).{6,}$/;
    return re.test(password);
  }

  async ingresar() {
    if (!this.nombre.trim() || !this.password.trim() || !this.correo.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, llena todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.validateEmail(this.correo)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa un correo electrónico válido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.validatePassword(this.password)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const user = users.find(
      (user: any) =>
        user.nombre.toLowerCase() === this.nombre.toLowerCase() &&
        user.correo.toLowerCase() === this.correo.toLowerCase() &&
        user.password === this.password
    );

    if (user) {
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión Exitoso',
        message: 'Bienvenido a AURONCOMICS.',
        buttons: ['OK'],
      });
      await alert.present();
      this.navCtrl.navigateRoot('/home');
    } 
    else if (
      this.nombre.toLowerCase() === this.cliente.nombre.toLowerCase() &&
      this.correo.toLowerCase() === this.cliente.correo.toLowerCase() &&
      this.password === this.cliente.password
    ) {
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión Exitoso',
        message: 'Bienvenido cliente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.navCtrl.navigateRoot('/home');
    } 
    else if (
      this.nombre.toLowerCase() === this.administrador.nombre.toLowerCase() &&
      this.correo.toLowerCase() === this.administrador.correo.toLowerCase() &&
      this.password === this.administrador.password
    ) {
      const alert = await this.alertController.create({
        header: 'Inicio de Sesión Exitoso',
        message: 'Bienvenido administrador.',
        buttons: ['OK'],
      });
      await alert.present();
      this.navCtrl.navigateRoot('/admin');
    } 
    else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre, correo o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

