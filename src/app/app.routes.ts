import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Login } from './views/login/login';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'login',
    component: Login
  }

];
