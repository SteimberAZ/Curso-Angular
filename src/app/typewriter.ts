import { Injectable } from '@angular/core';
import { interval, of, from, concat } from 'rxjs';
import { map, take, delay, ignoreElements, concatMap, repeat } from 'rxjs/operators';

interface TypeParams {
  word: string;
  speed: number;
  backwards?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TypewriterService {  // 👈 ESTO ES CLAVE

  private type({ word, speed, backwards = false }: TypeParams) {
    return interval(speed).pipe(
      map(x =>
        backwards
          ? word.substring(0, word.length - x)
          : word.substring(0, x + 1)
      ),
      take(word.length)
    );
  }

  private typeEffect(word: string) {
    return concat(
      this.type({ word, speed: 50 }),
      of('').pipe(delay(1200), ignoreElements()),
      this.type({ word, speed: 30, backwards: true }),
      of('').pipe(delay(300), ignoreElements())
    );
  }

  getTypewriterEffect(words: string[]) {
    return from(words).pipe(
      concatMap(word => this.typeEffect(word)),
      repeat()
    );
  }
}