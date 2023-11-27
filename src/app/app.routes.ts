import { Routes } from '@angular/router';
import { GameComponent } from './views/game/game-component.component';

export const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: '', redirectTo: 'game', pathMatch: 'full'},
];
