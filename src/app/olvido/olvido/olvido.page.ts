import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.page.html',
  styleUrls: ['./olvido.page.scss'],
})
export class OlvidoPage {
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  // Validar que el correo tenga un formato válido
  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  // Validar que la contraseña sea segura
  validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  // Función para manejar la restauración de contraseña
  async restaurarPassword() {
    // Validar que los campos están llenos
    if (!this.correo.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, llena todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar que el correo tenga un formato válido
    if (!this.validateEmail(this.correo)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa un correo electrónico válido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar que la nueva contraseña sea segura
    if (!this.validatePassword(this.password)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar que las contraseñas coincidan
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Obtener usuarios registrados desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((user: any) => user.correo === this.correo);

    if (usuario) {
      // Actualizar la contraseña del usuario
      usuario.password = this.password;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Contraseña restaurada exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();

      // Navegar a la página de inicio de sesión
      this.navCtrl.navigateRoot('/login');
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo no registrado.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

