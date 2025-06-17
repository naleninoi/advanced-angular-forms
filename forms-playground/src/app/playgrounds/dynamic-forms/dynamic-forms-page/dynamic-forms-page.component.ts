import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { DynamicFormConfig } from '../dynamic-forms.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-dynamic-forms-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
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

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.formConfig$ = this.formLoadingTrigger.pipe(
            switchMap(config => this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)),
            tap(({ controls }) => this.buildForm(controls))
        );
    }

    public onSubmit(): void {
        console.log(this.form.value);
        this.form.reset();        
    }

    private buildForm(controls: DynamicFormConfig['controls']): void {
        this.form = new FormGroup({});

        Object.keys(controls).forEach(key => {
            this.form.addControl(key, new FormControl(controls[key].value))
        });        
    }

}
