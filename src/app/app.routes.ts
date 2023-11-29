import { Routes } from '@angular/router';
import { GameComponent } from './views/game/game-component.component';

export const routes: Routes = [
  { path: '', component: GameComponent, pathMatch: 'full', },
  { path: 'game', component: GameComponent },
];
