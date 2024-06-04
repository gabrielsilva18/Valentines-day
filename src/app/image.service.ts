import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imagens: string[] = [];
  private apiUrl = '/listar-imagens'; // Ajuste para funcionar em produção no Vercel

  constructor(private http: HttpClient) {
    this.fetchImagesFromServer();
  }

  private fetchImagesFromServer() {
    this.http
      .get<string[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter a lista de imagens:', error);
          return of([]); // Retornar um array vazio em caso de erro
        })
      )
      .subscribe((imageUrls) => {
        this.imagens = imageUrls;
      });
  }

  getRandomImage(): Observable<string[]> {
    if (this.imagens.length === 0) {
      return of([]);
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const averageImageWidth = 150;
    const averageImageHeight = 150;

    const imagesPerRow = Math.floor(screenWidth / averageImageWidth);
    const rows = Math.floor(screenHeight / averageImageHeight);
    const totalImages = imagesPerRow * rows;

    const selectedIndexes = new Set<number>();
    const randomImages: string[] = [];
    while (
      randomImages.length < totalImages &&
      randomImages.length < this.imagens.length
    ) {
      const randomIndex = Math.floor(Math.random() * this.imagens.length);
      if (!selectedIndexes.has(randomIndex)) {
        selectedIndexes.add(randomIndex);
        randomImages.push(this.imagens[randomIndex]);
      }
    }

    return of(randomImages);
  }
}
