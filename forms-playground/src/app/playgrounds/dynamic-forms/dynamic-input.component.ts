import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl } from './base-dynamic-control';

@Component({
    selector: 'app-dynamic-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
              <ng-container [formGroup]="formGroup">
                    <input  [formControlName]="control.controlKey"
                            [type]="control.config.type"
                            [id]="control.controlKey"
                            [value]="control.config.value">
              </ng-container>
  `,
    styles: [
    ]
})
export class DynamicInputComponent extends BaseDynamicControl {
}
