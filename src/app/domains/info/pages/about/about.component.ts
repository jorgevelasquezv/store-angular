import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { WaveAudioComponent } from '@/info/components/wave-audio/wave-audio.component';
import { CounterComponent } from '@/shared/components/counter/counter.component';
import { HighlightDirective } from '@/shared/directives/highlight.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CounterComponent, WaveAudioComponent, HighlightDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export default class AboutComponent {
  public duration = signal(1000);

  public message = signal('Hello world');

  public changeDurationHandler(event: Event): void {
    this.duration.set(Number((event.target as HTMLInputElement).value));
  }

  public changeMessageHandler(event: Event): void {
    this.message.set((event.target as HTMLInputElement).value);
  }
}
