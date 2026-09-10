import { EnterpriseEntity } from '@/models/entities/enterprise.entity';
import { TransferenciaEntity } from '@/models/entities/transferencia.entity';
import { TransferenciasService } from '@/services/transferencias.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TransferenciasNavigationState } from './transferencias.model';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.component.html',
  styleUrls: ['./transferencias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferenciasComponent implements OnInit {
  enterprise: EnterpriseEntity | undefined;

  transferencias: TransferenciaEntity[] = [];
  hasError = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private transferenciasService: TransferenciasService,
  ) {
    const navigationState = this.router.getCurrentNavigation()?.extras
      .state as TransferenciasNavigationState | undefined;

    this.enterprise = navigationState?.enterprise;
  }

  ngOnInit(): void {
    if (!this.enterprise?.cuit) {
      this.hasError = true;
      return;
    }

    this.transferenciasService
      .getAll(this.enterprise.cuit)
      .pipe(finalize(() => this.cdRef.markForCheck()))
      .subscribe({
        next: (transferencias) => {
          this.transferencias = transferencias;
          this.hasError = false;
        },
        error: () => {
          this.transferencias = [];
          this.hasError = true;
        },
      });
  }

  trackByNroTransaccion(
    _index: number,
    transferencia: TransferenciaEntity
  ): string {
    return transferencia.nroTransaccion;
  }
}
