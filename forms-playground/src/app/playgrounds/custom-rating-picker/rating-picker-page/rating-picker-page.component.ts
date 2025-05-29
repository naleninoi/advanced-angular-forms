import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RatingOptions, RatingPickerComponent } from 'custom-form-controls';

interface Rating {
  reviewText: string,
  reviewRating: RatingOptions
}

@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingPickerComponent],
  templateUrl: './rating-picker-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './rating-picker-page.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerPageComponent implements OnInit {

    form = this.fb.group<Rating>({
    reviewText: '',
    reviewRating: 'great'
  })

  constructor(private fb: FormBuilder) {
    // this.form.controls.reviewRating.disable();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }

}
