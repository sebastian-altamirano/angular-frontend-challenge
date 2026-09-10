import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-primary',
  templateUrl: './button-primary.component.html',
  styleUrls: ['./button-primary.component.scss'],
})
export class ButtonPrimaryComponent {
  @Input() isDisabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();
}
