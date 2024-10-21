import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  correo: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private services: ServicesService // Inyectamos el servicio
  ) {}

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password: string): boolean {
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

    try {
      const user = await this.services.obtenerUsuario(this.correo, this.password);

      if (user) {
        const alert = await this.alertController.create({
          header: 'Inicio de Sesión Exitoso',
          message: 'Bienvenido a AURONCOMICS.',
          buttons: ['OK'],
        });
        await alert.present();
        this.navCtrl.navigateRoot('/home');
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Nombre, correo o contraseña incorrectos.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo conectar a la base de datos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
