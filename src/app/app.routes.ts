import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'team', loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent) },
  { path: 'adventures', loadComponent: () => import('./pages/adventures/adventures.component').then(m => m.AdventuresComponent) },
  { path: 'prices', loadComponent: () => import('./pages/prices/prices.component').then(m => m.PricesComponent) },
  { path: 'faq', loadComponent: () => import('./pages/faq/faq.component').then(m => m.FaqComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.component').then(m => m.AccountComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-dogs',
    loadComponent: () => import('./pages/my-dogs/my-dogs.component').then(m => m.MyDogsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard]
  },
  { path: '**', redirectTo: '' }
];
