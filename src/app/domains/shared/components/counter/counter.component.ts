import { CommonModule } from '@angular/common';
import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  @Input({ required: true })
  public duration: number = 0;

  @Input({ required: true })
  public message: string = '';

  public countRef: number | undefined;

  public counter = signal(0);

  constructor() {
    this.duration = 0;
    this.message = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('On Changes');

    console.log(changes);
  }

  ngOnInit(): void {
    this.countRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update((statePrev) => statePrev + 1);
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countRef) {
      window.clearInterval(this.countRef);
    }
  }
}
