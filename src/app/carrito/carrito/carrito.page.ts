import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: any[] = [];

  

  constructor(private router: Router, private alertController: AlertController) {
    // Obtener los productos pasados desde el HomePage
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.carrito = navigation.extras.state['carrito'];
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Su compra ha sido finalizada',
      message: 'Tiene que volver a la página anterior si quiere comprar otro producto.',
      buttons: [
        {
          text: 'Volver',
          handler: () => {
          
            this.router.navigate(['/home']);  
          }
        }
      ],
    });

    await alert.present();
  }

  

  ngOnInit() {}

  // Método para eliminar un producto del carrito
  eliminarDelCarrito(comic: any) {
    this.carrito = this.carrito.filter(c => c !== comic);
  }
}
