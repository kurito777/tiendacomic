import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  usuario: string = '';
  telefono: string = '';
  correo: string = '';
  password: string = '';
  imagen: string | undefined;

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  
  

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

  // Validar que el teléfono tenga un formato válido (10 dígitos como ejemplo)
  validatePhone(phone: string): boolean {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }

  async guardar() {
    // Validar que los campos estén llenos
    if (!this.usuario.trim() || !this.telefono.trim() || !this.correo.trim() || !this.password.trim()) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, llena todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Validar el formato del teléfono
    if (!this.validatePhone(this.telefono)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El número de teléfono debe contener 10 dígitos.',
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

    // Validar que la contraseña sea segura
    if (!this.validatePassword(this.password)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Si todo es válido, mostrar mensaje de éxito
    const alert = await this.alertController.create({
      header: 'Perfil Actualizado',
      message: 'Tus datos han sido guardados con éxito.',
      buttons: ['OK'],
    });
    await alert.present();

    
    this.navCtrl.navigateRoot('/home');
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
   
    this.imagen = image.webPath;
  
    
  };
}


