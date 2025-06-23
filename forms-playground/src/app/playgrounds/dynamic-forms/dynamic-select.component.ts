import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from './control-data.token';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl } from './base-dynamic-control';

@Component({
    selector: 'app-dynamic-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
                  <ng-container [formGroup]="formGroup">
                        <select
                            [formControlName]="control.controlKey"
                            [id]="control.controlKey"
                            [value]="control.config.value">
                            <option *ngFor="let option of control.config.options"
                                [value]="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                  </ng-container>
  `,
    styles: [
    ]
})
export class DynamicSelectComponent extends BaseDynamicControl {
}
