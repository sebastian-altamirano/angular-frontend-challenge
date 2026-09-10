import {
  AlertModule,
  ButtonPrimaryModule,
  ContentContainerModule,
  InputOutlineModule,
} from '@/lib';
import { LoginComponent } from '@/pages/login/login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
  declarations: [AuthLayoutComponent, LoginComponent],
  imports: [
    AlertModule,
    AuthLayoutRoutingModule,
    ButtonPrimaryModule,
    CommonModule,
    ContentContainerModule,
    InputOutlineModule,
    ReactiveFormsModule,
  ],
})
export class AuthLayoutModule {}
