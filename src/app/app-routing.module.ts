import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { GuardsService } from './services/guards.service';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then((module) => module.MainModule),
    canActivate: [GuardsService],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
