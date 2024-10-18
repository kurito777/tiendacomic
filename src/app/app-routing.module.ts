import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./acercade/acercade/acercade.module').then( m => m.AcercadePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'olvido',
    loadChildren: () => import('./olvido/olvido/olvido.module').then( m => m.OlvidoPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
