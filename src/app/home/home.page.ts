import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para la navegación

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedComic: any = null;
  carrito: any[] = [];
  comics: any[] = [];
  comicsDescuento = [
    {
      title: 'The Batman',
      subtitle: 'Batman de Tim Burton de 1989',
      description: 'El regreso de Batman en la versión de Tim Burton de 1989.',
      price: '$22.000',
      author: 'Sam Hamm',
      illustrator: 'Joe Quinones',
      editor: 'DC Comics',
      publishDate: '15 de Agosto de 2021',
      image: 'https://entertainmentfish.com/wp-content/uploads/2021/07/bm89_cv1.jpg',
    },
    {
      title: 'Superman',
      subtitle: 'Superman-1',
      description: 'Superman enfrenta nuevas aventuras en esta edición escrita por Brian Michael Bendis.',
      price: '$17.990',
      author: 'Brian Michael Bendis',
      illustrator: 'Joe Prado e Ivan Reis',
      editor: 'DC Comics',
      publishDate: '7 de Enero de 2022',
      image: 'https://i1.wp.com/multiversitystatic.s3.amazonaws.com/uploads/2018/07/Superman-1.jpg?fit=1000%2C1538',
    },
    {
      title: 'Raven',
      subtitle: 'Escrito por Marv Wolfman',
      description: 'Raven enfrenta sus demonios internos en esta oscura aventura.',
      price: '$7.000',
      author: 'Marv Wolfman',
      illustrator: 'Alisson Borges',
      editor: 'DC Comics',
      publishDate: '15 de Febrero de 2017',
      image: 'https://cdn.comixwire.com/i/cw/common/66001081/a0006_raven_cover01.jpg',
    },
    {
      title: 'Heroes In Crisis',
      subtitle: 'Ilustración de Clay Mann',
      description: 'Los héroes se enfrentan a una crisis sin precedentes en este evento épico.',
      price: '$14.900',
      author: 'Tom King',
      illustrator: 'Clay Mann',
      editor: 'DC Comics',
      publishDate: '26 de Septiembre de 2018',
      image: 'https://cdn.vox-cdn.com/thumbor/oy38niDsodyXDYrL9elW6Y3faDE=/0x0:1988x3056/1200x0/filters:focal(0x0:1988x3056)/cdn.vox-cdn.com/uploads/chorus_asset/file/11532349/image1.jpeg',
    },
  ];

  constructor(private router: Router) {
    this.loadComics();
  }

  // Método para cargar cómics desde localStorage
  loadComics() {
    const storedComics = localStorage.getItem('comics');
    this.comics = storedComics ? JSON.parse(storedComics) : [];
  }

  // Método para alternar entre mostrar u ocultar los detalles
  toggleDetails(comic: any) {
    if (this.selectedComic === comic) {
      this.selectedComic = null;
    } else {
      this.selectedComic = comic;
    }
  }

  // Método para agregar el cómic al carrito
  agregarAlCarrito(comic: any) {
    this.carrito.push(comic);
    alert(`${comic.title} agregado al carrito.`);
  }

  // Método para ver el carrito
  verCarrito() {
    this.router.navigate(['/carrito'], { state: { carrito: this.carrito } }); // Navegar a la página del carrito
  }
}
