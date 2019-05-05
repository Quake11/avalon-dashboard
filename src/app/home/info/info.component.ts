import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../../services/weather/weather.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  currentTemp$: Observable<{}>;
  forecast$: Observable<{}>;

  currency$: Observable<{}>;

  constructor(
    private afs: AngularFirestore,
    private ref: ChangeDetectorRef,
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
