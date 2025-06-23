import { Directive, inject } from "@angular/core";
import { FormGroup, ControlContainer } from "@angular/forms";
import { CONTROL_DATA } from "./control-data.token";

@Directive()
export abstract class BaseDynamicControl {
    control = inject(CONTROL_DATA);

    get formGroup(): FormGroup {
        return this.parentFormGroup.control as FormGroup;
    }

    private parentFormGroup = inject(ControlContainer);
}