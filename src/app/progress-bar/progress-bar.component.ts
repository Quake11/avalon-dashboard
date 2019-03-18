import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProgressBarComponent implements OnInit {
  @Input()
  value: number;

  constructor() {}

  ngOnInit() {}
}
