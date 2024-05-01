import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../../image.service'; // Importe o serviço
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css'],
})
export class BigCardComponent implements OnInit {
  photoCover: string[] = [];
  contentTitle: string = '';
  contentDescription: string = '';
  id: string | null = '0';

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService // Injete o serviço
  ) {}

  ngOnInit(): void {
    // Obtenha o parâmetro 'id' da rota
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id'); // Acesse o parâmetro 'id' usando o método 'get'
      this.setValuesToComponent(this.id);
    });
  }

  // Setar valores para os conteúdos, buscando através do serviço de imagens aleatórias
  setValuesToComponent(id: string | null) {
    // Use o método getRandomImage() para obter uma imagem aleatória
    this.imageService.getRandomImage().subscribe((imageUrl) => {
      this.photoCover = imageUrl;
      this.id = id;
    });
  }
}
