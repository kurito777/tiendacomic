import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  isModalOpen = false;
  modalAction = ''; // 'Agregar' o 'Modificar'

  // Variables para almacenar los datos del cómic
  comicTitle = '';
  comicSubtitle = '';
  comicDescription = '';
  comicPrice = 0;
  comicAuthor = '';
  comicIllustrator = '';
  comicEditor = '';
  comicPublishDate = '';
  comicImage = '';

  comicsList: any[] = [];

  constructor() {
    this.loadComics();
  }

  openForm(action: string) {
    this.modalAction = action;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm() {
    this.comicTitle = '';
    this.comicSubtitle = '';
    this.comicDescription = '';
    this.comicPrice = 0;
    this.comicAuthor = '';
    this.comicIllustrator = '';
    this.comicEditor = '';
    this.comicPublishDate = '';
    this.comicImage = '';
  }

  saveComic() {
    if (this.comicPrice < 0) {
      alert('El precio no puede ser negativo.');
      return;
    }

    const newComic = {
      title: this.comicTitle,
      subtitle: this.comicSubtitle,
      description: this.comicDescription,
      price: `$${this.comicPrice}`,
      author: this.comicAuthor,
      illustrator: this.comicIllustrator,
      editor: this.comicEditor,
      publishDate: this.comicPublishDate,
      image: this.comicImage || 'https://via.placeholder.com/250',
    };

    if (this.modalAction === 'Agregar') {
      this.comicsList.push(newComic);
    } else if (this.modalAction === 'Modificar') {
      const index = this.comicsList.findIndex(comic => comic.title === this.comicTitle);
      if (index > -1) {
        this.comicsList[index] = newComic;
      }
    }

    localStorage.setItem('comics', JSON.stringify(this.comicsList));
    this.closeModal();
  }

  loadComics() {
    const storedComics = localStorage.getItem('comics');
    this.comicsList = storedComics ? JSON.parse(storedComics) : [];
  }

  eliminarItem(title: string) {
    this.comicsList = this.comicsList.filter(comic => comic.title !== title);
    localStorage.setItem('comics', JSON.stringify(this.comicsList));
  }
}
