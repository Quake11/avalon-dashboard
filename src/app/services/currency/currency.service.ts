import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private updateTime = 3600000;

  constructor(private http: HttpClient) {}

  private get _currency$(): Observable<{}> {
    return this.http.get<{}>('https://www.cbr-xml-daily.ru/daily_json.js');
  }

  get currencyRealtime$() {
    return timer(0, this.updateTime).pipe(
      switchMap(() => this._currency$),
      map(data => {
        const result = {
          usd: parseFloat(data['Valute'].USD.Value).toPrecision(6),
          euro: parseFloat(data['Valute'].EUR.Value).toPrecision(6)
        };

        console.log(data);
        console.log(result);

        return result;
      })
    );
  }
}
