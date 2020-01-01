import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/user-management/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/user-management/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/user-management/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'profile/:uid',
    loadChildren: () => import('./pages/user-management/profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
