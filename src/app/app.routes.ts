import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { heroPageComponent } from './pages/hero/hero-page.component';
import { CoraPageComponent } from './pages/cora/cora-page.component';
export const routes: Routes = [
    {
    path: 'th',
    component: CounterPageComponent,
    },
    {
    path: 'hero',
    component: heroPageComponent,
    },
     {
    path: '',
    component: CoraPageComponent,
    },
];
