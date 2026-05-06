import { Component } from '@angular/core';
@Component({
  templateUrl: './counter-page.html',
})
export class CounterPageComponent {
  counter = 0;
  

  increment() {
    this.counter++;

    

   
  }
}