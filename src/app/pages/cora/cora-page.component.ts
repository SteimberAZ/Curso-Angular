import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxParticlesComponent } from '@omnedia/ngx-particles';

@Component({
  selector: 'app-cora-page',
  standalone: true,
  imports: [NgxParticlesComponent, CommonModule],
  templateUrl: './cora-page.component.html',
})
export class CoraPageComponent implements OnInit {

  name = signal('Toca mi corazón');
  ancho = signal(100);
  mostrar = signal(true);

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

     

      this.name.set('Gracias por ser parte de mi vida mi amor <3');

      setTimeout(() => {
        this.mostrar.set(false);
      }, 400);
    }
  }

  // 💥 EXPLOSIÓN
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
        life: 1
      });

    }

    this.particles.update(p => [...p, ...newParticles]);

    // limpiar después
    setTimeout(() => {
      this.particles.set([]);
    }, 1000);
  }

  // 🎬 ANIMACIÓN DE PARTÍCULAS (IMPORTANTE)
  animate() {

    const loop = () => {

      this.particles.update(particles =>
        particles.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.15, // gravedad
          life: p.life - 0.02
        })).filter(p => p.life > 0)
      );

      requestAnimationFrame(loop);
    };

    loop();
  }

  // click manual opcional
  onClick(event: MouseEvent) {
    this.explode(event.clientX, event.clientY);
  }
}