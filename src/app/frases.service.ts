import { Injectable } from '@angular/core';
import frasesCarinhosas from './frases_carinhosas.json'; // Importe o arquivo JSON
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FrasesService {
  frases: string[] = this.removerDuplicatas(frasesCarinhosas.frases); // Remover frases duplicadas ao inicializar o serviço
  private apiUrl = './frases_carinhosas.json'; // Caminho para o arquivo JSON local

  constructor(private http: HttpClient) {}

  addFraseCarinhosa(frase: string): void {
    if (!this.frases.includes(frase)) {
      this.frases.push(frase);
      this.saveFrasesToJson(); // Salvar frases atualizadas no arquivo JSON
    }
  }

  getFraseCarinhosaAleatoria(): string {
    const index = Math.floor(Math.random() * this.frases.length);
    return this.frases[index];
  }

  private removerDuplicatas(frases: string[]): string[] {
    return frases.filter((frase, index) => frases.indexOf(frase) === index);
  }

  private saveFrasesToJson(): void {
    // Converta o array de frases para uma string JSON
    const frasesJSON = JSON.stringify({ frases: this.frases });

    // Salve a string JSON no arquivo local
    // Neste exemplo, vamos supor que você esteja usando o HttpClient apenas para ilustração
    this.http.put(this.apiUrl, frasesJSON).subscribe(
      () => {
        console.log('Frases salvas com sucesso!');
      },
      (error) => {
        console.error('Erro ao salvar frases:', error);
      }
    );
  }
}
