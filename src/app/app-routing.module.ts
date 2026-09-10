import { AuthenticatedGuard } from '@/core/guards/authenticated.guard';
import { PublicGuard } from '@/core/guards/public.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canLoad: [PublicGuard],
    loadChildren: () =>
      import('@/layouts/auth/auth-layout.module').then(
        (module) => module.AuthLayoutModule
      ),
  },
  {
    path: '',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('@/layouts/authenticated/authenticated-layout.module').then(
        (module) => module.AuthenticatedLayoutModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
