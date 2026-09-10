import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@/layouts/auth/auth-layout.module').then(
        (module) => module.AuthLayoutModule
      ),
  },
  {
    path: '',
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
