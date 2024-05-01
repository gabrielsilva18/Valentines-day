import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../image.service'; // Importe o serviço
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  photoCovers: string[] = [];
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
      this.setValuesToComponent();
    });
  }

  // Setar valores para os conteúdos, buscando através do serviço de imagens aleatórias
  setValuesToComponent() {
    // Use o método getImagesToFillScreen() para obter uma lista de imagens aleatórias
    this.imageService.getRandomImage().subscribe((imageUrls) => {
      this.photoCovers = imageUrls;
    });
  }
}
