import { ChangeDetectionStrategy, Component, inject, inputBinding, signal } from '@angular/core';

@Component({
  templateUrl: './hero-page.component.html',
  
})
export class heroPageComponent {
  name = signal('IronMan');
  age = signal(45);
    inputValue = signal(''); 
  getHeroDescription() {
    return `${this.name()} tiene ${this.age()} años.`;
  }
  changeHero() {
    this.name.set('SpiderMan');
    this.age.set(18);
  }
  resetForm() {
    this.name.set('IronMan');
    this.age.set(45);
  }
  changeAge() {
    this.age.set(65);
  }
  changeinput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputValue.set(input.value);
  }
  changeHero2() {
    this.name.set(this.inputValue());
  }
}