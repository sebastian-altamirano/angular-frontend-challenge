import { AuthenticatedGuard } from '@/core/guards/authenticated.guard';
import { SelectEnterpriseComponent } from '@/pages/select-enterprise/select-enterprise.component';
import { TransferenciasComponent } from '@/pages/transferencias/transferencias.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLayoutComponent } from './authenticated-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: 'seleccionar-empresa',
        component: SelectEnterpriseComponent,
      },
      {
        path: 'transferencias',
        component: TransferenciasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedLayoutRoutingModule {}
