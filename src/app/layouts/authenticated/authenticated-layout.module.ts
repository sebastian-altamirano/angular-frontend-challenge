import {
  AlertModule,
  ContentContainerModule,
  EnterpriseDetailModule,
  ModalAsideModule,
  TableCustomModule,
} from '@/lib';
import { SelectEnterpriseComponent } from '@/pages/select-enterprise/select-enterprise.component';
import { TransferenciaEstadoPipe } from '@/pages/transferencias/transferencia-estado.pipe';
import { TransferenciasComponent } from '@/pages/transferencias/transferencias.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticatedLayoutRoutingModule } from './authenticated-layout-routing.module';
import { AuthenticatedLayoutComponent } from './authenticated-layout.component';

@NgModule({
  declarations: [
    AuthenticatedLayoutComponent,
    SelectEnterpriseComponent,
    TransferenciaEstadoPipe,
    TransferenciasComponent,
  ],
  imports: [
    AlertModule,
    AuthenticatedLayoutRoutingModule,
    CommonModule,
    ContentContainerModule,
    EnterpriseDetailModule,
    ModalAsideModule,
    TableCustomModule,
  ],
})
export class AuthenticatedLayoutModule {}
