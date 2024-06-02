import { Injectable } from '@angular/core';
import frasesCarinhosas from './frases_carinhosas.json'; // Importe o arquivo JSON
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FrasesService {
  private frases: string[] = []; // Lista de frases disponíveis
  private usedFrases: string[] = []; // Lista de frases já utilizadas
  private apiUrl = './frases_carinhosas.json'; // Caminho para o arquivo JSON local

  constructor(private http: HttpClient) {
    this.initFrases(); // Inicializa as frases ao criar o serviço
  }

  private initFrases(): void {
    // Remove frases duplicadas e inicia a lista de frases disponíveis
    this.frases = this.removerDuplicatas(frasesCarinhosas.frases);
  }

  addFraseCarinhosa(frase: string): void {
    if (!this.frases.includes(frase)) {
      this.frases.push(frase);
      this.saveFrasesToJson(); // Salva frases atualizadas no arquivo JSON
    }
  }

  getFraseCarinhosaAleatoria(): string {
    if (this.frases.length === 0) {
      return ''; // Retorna vazio se não houver frases disponíveis
    }

    const randomIndex = Math.floor(Math.random() * this.frases.length);
    const randomFrase = this.frases[randomIndex];

    // Move a frase utilizada para a lista de frases já utilizadas
    this.usedFrases.push(randomFrase);
    this.frases.splice(randomIndex, 1); // Remove a frase utilizada da lista de frases disponíveis

    return randomFrase;
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
