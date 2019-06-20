import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService, CurrencyService } from '../../services';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {
  currentTemp$: Observable<{}>;
  forecast$: Observable<{}>;

  currency$: Observable<{}>;

  constructor(
    private weather: WeatherService,
    private currency: CurrencyService
  ) {}

  ngOnInit() {
    this.currency$ = this.currency.currencyRealtime$;
    this.setWeather();
  }

  setWeather() {
    this.currentTemp$ = this.weather.currentRealtime$;
    this.forecast$ = this.weather.forecastRealtime$;
  }
}
