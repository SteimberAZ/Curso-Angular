import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common'; 
import { TypewriterService } from '../../typewriter';

@Component({
  templateUrl: './counter-page.component.html',
  standalone: true, 
  imports: [AsyncPipe], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent {

  counter = 0;
  titles = ['Elkin', 'come', 'pene'];
  counterSignal = signal(10);
  private typewriterService = inject(TypewriterService);

  constructor() {
    setInterval(() => {
      this.counter++;
      this.counterSignal.update(current => current + 1);
      console.log('Counter:', this.counter, 'Counter Signal:', this.counterSignal());
    }, 1000);
  }


  increment(value: number) {
    this.counter += value;
    this.counterSignal.update(current => current + value);
  }

  reset(value: number) {
    this.counter = value;
    this.counterSignal.set(0);
  }

  typedText$ = this.typewriterService.getTypewriterEffect(this.titles);
}