import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-outline',
  templateUrl: './input-outline.component.html',
  styleUrls: ['./input-outline.component.scss'],
})
export class InputOutlineComponent {
  private static nextId = 0;

  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() a11yLabel: string = '';
  @Input() id = `input-outline-${InputOutlineComponent.nextId++}`;
  @Input() control?: FormControl;
}
