import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = ''; 
  correo: string = '';
  password: string = ''; 
  confirmPassword: string = ''; 

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  // Validaciones
  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  validateUsername(nombre: string): boolean {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(nombre);
  }

  async registrar() {
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

    if (this.password.length < 8) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe tener al menos 8 caracteres.',
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

    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.validateUsername(this.nombre)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de usuario no debe contener caracteres especiales.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (users.some((user: any) => user.correo === this.correo)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El correo electrónico ya está registrado.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (users.some((user: any) => user.nombre === this.nombre)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de usuario ya está en uso.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const newUser = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
    };
    users.push(newUser);
    localStorage.setItem('usuarios', JSON.stringify(users));

    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'Te has registrado correctamente.',
      buttons: ['OK'],
    });
    await alert.present();

    this.navCtrl.navigateRoot('/login');
  }
}

