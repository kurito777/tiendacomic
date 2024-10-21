import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service'; // Asegúrate de tener la ruta correcta
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  telefono: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = ''; // Agregar esta línea

  constructor(
    private services: ServicesService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async registrar() {
    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return; // Terminar la ejecución si hay un error
    }

    try {
      await this.services.insertarUsuario(this.nombre, this.telefono, this.correo, this.password);
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Te has registrado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.navCtrl.navigateRoot('/login');
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error.message || 'No se pudo registrar el usuario.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
