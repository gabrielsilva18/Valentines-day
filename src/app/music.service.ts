import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private audio: HTMLAudioElement;
  private isPlaying: boolean = false;
  private isLoaded: boolean = false;

  constructor() {
    this.audio = new Audio('./assets/VMZ - Saturno 💫 _ Lyric Vídeo.mp4');
    this.audio.loop = true; // Loop the music
    this.audio.addEventListener('loadedmetadata', () => {
      this.isLoaded = true;
      if (this.isPlaying) {
        this.audio.play();
      }
    });
  }

  playMusic() {
    if (!this.isPlaying && this.isLoaded) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  pauseMusic() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }
}
