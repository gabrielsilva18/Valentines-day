import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../image.service';

@Component({
  selector: 'app-img-album',
  templateUrl: './img-album.component.html',
  styleUrls: ['./img-album.component.css'],
})
export class ImgAlbumComponent implements OnInit {
  image: string = ''; // Alterado para uma única string

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    this.imageService.getRandomImage();
    // Agora você tem a URL da imagem e pode fazer o que quiser com ela
  }
}
