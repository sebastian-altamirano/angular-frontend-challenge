import { EnterpriseEntity } from '@/models/entities/enterprise.entity';
import { TransferenciaEntity } from '@/models/entities/transferencia.entity';
import { TransferenciasService } from '@/services/transferencias.service';
import { decodeObjectFromBase64 } from '@/utils/base64-object.util';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { TransferenciasQueryParams } from './transferencias.model';

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
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private transferenciasService: TransferenciasService,
  ) {
    const queryParams = this.activatedRoute.snapshot.queryParams as TransferenciasQueryParams;

    try {
      this.enterprise = decodeObjectFromBase64<EnterpriseEntity>(queryParams.enterprise);
    } catch {
      this.hasError = true;
    }
  }

  ngOnInit(): void {
    if (this.hasError || !this.enterprise?.cuit) {
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
