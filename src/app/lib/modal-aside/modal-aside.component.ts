import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal-aside',
  templateUrl: './modal-aside.component.html',
  styleUrls: ['./modal-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAsideComponent implements OnDestroy {
  @Input() a11yLabel = 'Diálogo';

  @ContentChild('modalInitialFocus', { read: ElementRef }) initialFocusElement?: ElementRef<HTMLElement>;

  @ViewChild('dialog')
  set dialog(dialog: ElementRef<HTMLElement> | undefined) {
    if (!dialog) {
      return;
    }

    (this.initialFocusElement ?? dialog).nativeElement.focus();
  }

  showModal = false;
  private previousBodyOverflowY = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdRef: ChangeDetectorRef
  ) {}

  show(): void {
    if (!this.showModal) {
      this.previousBodyOverflowY = this.document.body.style.overflowY;
    }

    this.document.body.style.overflowY = 'hidden';
    this.showModal = true;
    this.cdRef.markForCheck();
  }

  hide(): void {
    if (!this.showModal) {
      return;
    }

    this.document.body.style.overflowY = this.previousBodyOverflowY;
    this.showModal = false;
    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {
    if (this.showModal) {
      this.document.body.style.overflowY = this.previousBodyOverflowY;
    }
  }
}
