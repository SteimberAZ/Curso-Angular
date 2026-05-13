import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxParticlesComponent } from '@omnedia/ngx-particles';
import { AsyncPipe } from '@angular/common';
import { TypewriterService } from '../../typewriter';

@Component({
  selector: 'app-cora-page',
  standalone: true,
  imports: [NgxParticlesComponent, CommonModule, AsyncPipe],
  templateUrl: './cora-page.component.html',
})
export class CoraPageComponent implements OnInit {

  name = signal('Toca mi corazón');
  ancho = signal(100);
  mostrar = signal(true);

  titles = signal([
    'Toca mi corazón',
    'y verás que te amo',
    'más de lo que imaginas'
  ]);

  private typewriterService = inject(TypewriterService);

  typedText$ = this.typewriterService.getTypewriterEffect(this.titles());

  particles = signal<any[]>([]);

  ngOnInit() {
    this.animate();
  }

  changeWidth() {

    this.ancho.set(this.ancho() + 20);

    if (this.ancho() <= 300) {
      this.explode(window.innerWidth / 2, window.innerHeight / 2);
    }

    if (this.ancho() >= 300) {

        this.titles.set(["No fue un click… fue un recuerdo activándose 💫",
    "Hay personas que llegan y cambian el ritmo del corazón 💖",
    "Lo que sentí no se puede explicar, solo sentir 💕",
    "Tu toque dejó una huella en mí ✨",
    "A veces un gesto pequeño significa todo un universo 💘"]);

     
      this.typedText$ =
        this.typewriterService.getTypewriterEffect(this.titles());

      this.mostrar.set(false);
    }
  }

  explode(x: number, y: number) {

    const newParticles: any[] = [];

    for (let i = 0; i < 35; i++) {

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;

      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 4,
        life: 9
      });

    }

    this.particles.update(p => [...p, ...newParticles]);

    setTimeout(() => {
      this.particles.set([]);
    }, 4000);
  }

  animate() {

    const loop = () => {

      this.particles.update(particles =>
        particles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            life: p.life - 0.02
          }))
          .filter(p => p.life > 0)
      );

      requestAnimationFrame(loop);
    };

    loop();
  }

  onClick(event: MouseEvent) {
    this.explode(event.clientX, event.clientY);
  }
}