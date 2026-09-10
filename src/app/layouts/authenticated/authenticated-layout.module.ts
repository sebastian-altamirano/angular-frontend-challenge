import { EnterpriseDetailModule, ModalAsideModule } from '@/lib';
import { SelectEnterpriseComponent } from '@/pages/select-enterprise/select-enterprise.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticatedLayoutRoutingModule } from './authenticated-layout-routing.module';
import { AuthenticatedLayoutComponent } from './authenticated-layout.component';

@NgModule({
  declarations: [AuthenticatedLayoutComponent, SelectEnterpriseComponent],
  imports: [
    AuthenticatedLayoutRoutingModule,
    CommonModule,
    EnterpriseDetailModule,
    ModalAsideModule,
  ],
})
export class AuthenticatedLayoutModule {}
