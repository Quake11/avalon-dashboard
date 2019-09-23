import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormattedDate, getFormattedDates } from 'src/app/utils';
import { CurrencyService, WeatherService } from '../../services';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {
  currentTemp$: Observable<any>;
  forecast$: Observable<any>;
  currency$: Observable<any>;

  datetimeData$: Observable<FormattedDate>;

  constructor(
    private weather: WeatherService,
    private currency: CurrencyService
  ) {}

  ngOnInit() {
    this.currency$ = this.currency.currencyRealtime$;
    this.setWeather();

    this.datetimeData$ = interval(1000).pipe(
      map(() => {
        return getFormattedDates();
      })
    );
  }

  setWeather() {
    this.currentTemp$ = this.weather.currentRealtime$;
    this.forecast$ = this.weather.forecastRealtime$;
  }
}
