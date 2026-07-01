import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { Login } from './views/login/login';
import { GeneradorFichas } from './views/generador-fichas/generador-fichas';
import { Error404 } from './views/error404/error404';


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
  },
  {
    path: 'fichasBurleta',
    component: GeneradorFichas
  },
  {
    path: '**',
    component: Error404
  }

];
