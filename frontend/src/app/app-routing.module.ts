import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcomepage',
    pathMatch: 'full'
  },
  {
    path: 'welcomepage',
    loadChildren: () =>
      import('./welcomepage/welcomepage.module').then(
        (m) => m.WelcomepagePageModule
      ),
  },
  {
    path: 'eventpage',
    loadChildren: () =>
      import('./eventpage/eventpage.module').then(
        (m) => m.EventpagePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'tab1',
    redirectTo: 'tabs',
  },
  {
    path: 'tab2',
    redirectTo: 'tabs/tab2',
  },
  {
    path: 'tab3',
    redirectTo: 'tabs/tab3',
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
