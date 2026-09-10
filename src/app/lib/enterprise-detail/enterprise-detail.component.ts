import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-enterprise-detail',
  templateUrl: './enterprise-detail.component.html',
  styleUrls: ['./enterprise-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterpriseDetailComponent {
  @Input() razonSocial = '';
  @Input() cuit = '';
  @Output() selected = new EventEmitter<void>();
}
