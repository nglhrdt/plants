import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plants',
  },
  {
    path: 'plants',
    loadComponent: () => import('./components/plants/plants.component').then((c) => c.PlantsComponent),
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: 'new',
        loadComponent: () => import('./components/create-plant/create-plant.component').then((c) => c.CreatePlantComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./components/plant-details/plant-details.component').then((c) => c.PlantDetailsComponent),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((c) => c.LoginComponent),
    ...canActivate(redirectLoggedInToHome),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
