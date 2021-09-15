import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((module) => module.MainModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
