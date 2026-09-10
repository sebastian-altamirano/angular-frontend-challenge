import { AuthEntity } from '@/models/entities/auth.entity';
import { getApiErrorMessages } from '@/utils/api-error-messages.util';
import { AuthService } from '@/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly emailControl = this.fb.control('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(155),
  ]);
  readonly passwordControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
  ]);
  readonly form = this.fb.group(
    {
      email: this.emailControl,
      password: this.passwordControl,
    },
    { updateOn: 'submit' }
  );

  errors: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  submit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.errors = [];
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.errors = this.getValidationErrors();
      return;
    }

    this.isSubmitting = true;
    this.authService
      .signIn(this.emailControl.value, this.passwordControl.value)
      .subscribe({
        next: (auth) => this.handleSuccess(auth),
        error: (error: unknown) => this.handleError(error),
      });
  }

  private handleSuccess(auth: AuthEntity): void {
    sessionStorage.setItem('auth', JSON.stringify(auth));
    this.router.navigateByUrl('/seleccionar-empresa');
  }

  private handleError(error: unknown): void {
    const apiErrors = this.getApiErrors(error);
    this.errors = apiErrors.length
      ? apiErrors
      : ['Error genérico del sistema, vuelva a intentarlo más tarde'];
    this.isSubmitting = false;
    this.changeDetectorRef.markForCheck();
  }

  private getApiErrors(error: unknown): string[] {
    if (
      !(error instanceof HttpErrorResponse) ||
      error.status !== 406 ||
      !error.error
    ) {
      return [];
    }

    return getApiErrorMessages(error);
  }

  private getValidationErrors(): string[] {
    const errors: string[] = [];
    const emailErrors = this.emailControl.errors;
    const passwordErrors = this.passwordControl.errors;

    if (emailErrors) {
      if (emailErrors['required']) {
        errors.push('El correo electrónico es obligatorio.');
      }
      if (emailErrors['email']) {
        errors.push('Ingresá un correo electrónico válido.');
      }
      if (emailErrors['maxlength']) {
        errors.push('El correo electrónico no puede superar los 155 caracteres.');
      }
    }

    if (passwordErrors) {
      if (passwordErrors['required']) {
        errors.push('La clave es obligatoria.');
      }
      if (passwordErrors['minlength'] || passwordErrors['maxlength']) {
        errors.push('La clave debe tener entre 8 y 16 caracteres.');
      }
    }

    return errors;
  }
}
