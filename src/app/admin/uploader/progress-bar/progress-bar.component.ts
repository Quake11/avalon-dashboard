import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
  @Input()
  value: number;

  constructor() {}

  ngOnInit() {}
}
