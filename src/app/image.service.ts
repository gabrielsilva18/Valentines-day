import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Importe 'of' do pacote rxjs

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imagens: string[] = [];

  constructor(private http: HttpClient) {
    const NUMERO_DE_IMAGENS = 80; // Substitua pelo número total de imagens que você tem

    for (let i = 1; i <= NUMERO_DE_IMAGENS; i++) {
      this.imagens.push(`assets/imagens/${i}.jpg`);
    }
  }
  getRandomImage(): Observable<string[]> {
    // Obtenha o tamanho da tela
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calcule o tamanho médio de cada imagem
    const averageImageWidth = 200; // Substitua pelo tamanho médio das suas imagens
    const averageImageHeight = 200; // Substitua pelo tamanho médio das suas imagens

    // Calcule quantas imagens caberão horizontalmente e verticalmente
    const imagesPerRow = Math.floor(screenWidth / averageImageWidth);
    const rows = Math.floor(screenHeight / averageImageHeight);

    // Calcule o total de imagens necessárias
    const totalImages = 80;

    // Mantenha um conjunto para controlar quais imagens já foram selecionadas
    const selectedIndexes = new Set<number>();

    // Retorne um array de URLs de imagens aleatórias com base no total calculado
    const randomImages: string[] = [];
    while (randomImages.length < totalImages) {
      const randomIndex = Math.floor(Math.random() * this.imagens.length);
      if (!selectedIndexes.has(randomIndex)) {
        selectedIndexes.add(randomIndex);
        randomImages.push(this.imagens[randomIndex]);
      }
    }

    return of(randomImages);
  }
}
