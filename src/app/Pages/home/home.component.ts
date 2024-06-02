import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../image.service';
import { FrasesService } from '../../frases.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MusicService } from '../../music.service'; // Importando o MusicService

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
  menuOpen: boolean = false; // Adicionando a propriedade menuOpen
  isPlaying: boolean = true; // Definindo como verdadeiro para iniciar a música

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private frasesService: FrasesService,
    private cdRef: ChangeDetectorRef,
    private musicService: MusicService // Injetando o MusicService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      this.setValuesToComponent();
      this.setFraseCarinhosa();
    });

    // Iniciar a música quando o componente for carregado
    this.musicService.playMusic();
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

  // Adicionando o método toggleMenu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.cdRef.detectChanges(); // Force change detection
  }

  // Métodos para controlar a música
  toggleMusic() {
    this.musicService.toggleMusic();
    this.isPlaying = !this.isPlaying;
  }
}
