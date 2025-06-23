import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { DynamicControl, DynamicFormConfig } from '../dynamic-forms.model';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { ControlInjectorPipe } from '../control-injector.pipe';

@Component({
    selector: 'app-dynamic-forms-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ControlInjectorPipe],
    templateUrl: './dynamic-forms-page.component.html',
    styleUrls: [
        '../../common-page.scss',
        './dynamic-forms-page.component.scss',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsPageComponent implements OnInit {

    form!: FormGroup;

    protected formLoadingTrigger = new Subject<'user' | 'company'>();
    protected formConfig$!: Observable<DynamicFormConfig>;

    constructor(
        private http: HttpClient,
        protected controlResolver: DynamicControlResolver) { }

    ngOnInit(): void {
        this.formConfig$ = this.formLoadingTrigger.pipe(
            switchMap(config => this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)),
            tap(({ controls }) => this.buildForm(controls))
        );
    }

    public onSubmit(): void {
        console.log(this.form);
        this.form.reset();
    }

    private buildForm(controls: DynamicFormConfig['controls']): void {
        this.form = new FormGroup({});

        Object.keys(controls).forEach(key => {
            const validators = this.resolveValidators(controls[key]);

            this.form.addControl(key, new FormControl(controls[key].value, validators))
        });
    }

    private resolveValidators({ validators = {} }: DynamicControl): ValidatorFn[] {
        return (Object.keys(validators) as Array<keyof typeof validators>).map(validatorKey => {
            const validatorValue = validators[validatorKey];

            if (validatorKey === 'required') {
                return Validators.required;
            }
            if (validatorKey === 'email') {
                return Validators.email;
            }
            if (validatorKey === 'requiredTrue') {
                return Validators.requiredTrue;
            }
            if (validatorKey === 'minLength' && typeof validatorValue === 'number') {
                return Validators.minLength(validatorValue);
            }

            return Validators.nullValidator;
        });
    }

}
