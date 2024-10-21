import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service'; // Asegúrate de que la ruta es correcta

interface Comic { 
  title: string;
  subtitle: string;
  description: string;
  price: string;
  author: string;
  illustrator: string;
  editor: string;
  publishDate: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedComic: Comic | null = null; 
  carrito: Comic[] = []; 
  comics: Comic[] = []; 

  constructor(private router: Router, private services: ServicesService) {
    this.loadComics(); // Cargar los cómics al iniciar el componente
  }

  // Método para cargar cómics desde SQLite
  async loadComics() {
    try {
      this.comics = await this.services.obtenerComics(); // Asegúrate de que el nombre del método sea correcto
    } catch (error) {
      console.error('Error al cargar los cómics:', error);
    }
  }
  
  toggleDetails(comic: Comic) {
    if (this.selectedComic === comic) {
      this.selectedComic = null;
    } else {
      this.selectedComic = comic;
    }
  }

  agregarAlCarrito(comic: Comic) {
    if (!this.carrito.some(item => item.title === comic.title)) {
      this.carrito.push(comic);
      alert(`${comic.title} agregado al carrito.`);
    } else {
      alert(`${comic.title} ya está en el carrito.`);
    }
  }

  verCarrito() {
    this.router.navigate(['/carrito'], { state: { carrito: this.carrito } });
  }
}
