import { AuthSessionService } from '@/core/services/auth-session.service';
import { ModalAsideComponent } from '@/lib';
import { EnterpriseEntity } from '@/models/entities/enterprise.entity';
import { EnterprisesService } from '@/services/enterprises.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-enterprise',
  templateUrl: './select-enterprise.component.html',
  styleUrls: ['./select-enterprise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectEnterpriseComponent implements OnInit {
  @ViewChild('enterpriseModal') enterpriseModal?: ModalAsideComponent;

  enterprises: EnterpriseEntity[] = [];

  constructor(
    private authSessionService: AuthSessionService,
    private cdRef: ChangeDetectorRef,
    private enterprisesService: EnterprisesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.enterprisesService.getAll().subscribe({
      next: (enterprises) => {
        this.enterprises = enterprises;
        this.cdRef.markForCheck();
        this.enterpriseModal?.show();
      },
      error: () => {
        this.authSessionService.clearAuth();
        this.router.navigateByUrl('/');
      },
    });
  }

  selectEnterprise(enterprise: EnterpriseEntity): void {
    this.router.navigateByUrl('/transferencias', {
      state: { enterprise },
    });
  }

  trackByEnterpriseId(_index: number, enterprise: EnterpriseEntity): number {
    return enterprise.id;
  }
}
