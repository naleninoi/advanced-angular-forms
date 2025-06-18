import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from './control-data.token';

@Component({
    selector: 'app-dynamic-input',
    standalone: true,
    imports: [CommonModule],
    template: `
              <input  [type]="control.config.type"
                      [id]="control.controlKey"
                      [value]="control.config.value">
  `,
    styles: [
    ]
})
export class DynamicInputComponent implements OnInit {

    control = inject(CONTROL_DATA);

    constructor() { }

    ngOnInit(): void {
    }

}
