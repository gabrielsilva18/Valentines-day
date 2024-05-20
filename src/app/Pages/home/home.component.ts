import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../image.service';
import { FrasesService } from '../../frases.service';
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
  poem: string = '';
  fraseCarinhosa: string = '';
  textoBotaoFotos: string = 'Mostrar Fotos';

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private frasesService: FrasesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      this.setValuesToComponent();
      this.setFraseCarinhosa();
    });
  }

  atualizarFotos() {
    this.setValuesToComponent();
    this.setFraseCarinhosa();

    if (this.textoBotaoFotos === 'Mostrar Fotos') {
      this.textoBotaoFotos = 'Atualizar Fotos';
    }
  }

  setValuesToComponent() {
    this.imageService.getRandomImage().subscribe((imageUrls) => {
      this.photoCovers = imageUrls;
    });
  }

  setFraseCarinhosa() {
    this.fraseCarinhosa = this.frasesService.getFraseCarinhosaAleatoria();
  }
}
