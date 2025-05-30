import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from "../../../../../../custom-form-controls/src/lib/select/select.module";

@Component({
  selector: 'app-custom-select-page',
  standalone: true,
  imports: [CommonModule, SelectModule],
  templateUrl: './custom-select-page.component.html',
  styleUrls: [
    '../../common-page.scss',
    './custom-select-page.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
