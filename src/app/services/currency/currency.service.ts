import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private updateTime = 100 * 60000;

  constructor(private http: HttpClient) {}

  private get _currency$(): Observable<{}> {
    return this.http.get<{}>('https://www.cbr-xml-daily.ru/daily_json.js');
  }

  public get currencyRealtime$() {
    return timer(0, this.updateTime).pipe(
      switchMap(() => this._currency$),
      map(data => {
        const valueUSD = parseFloat(data['Valute'].USD.Value).toPrecision(6);
        const prevValueUSD = parseFloat(
          data['Valute'].USD.Previous
        ).toPrecision(6);
        const valueEUR = parseFloat(data['Valute'].EUR.Value).toPrecision(6);
        const prevValueEUR = parseFloat(
          data['Valute'].EUR.Previous
        ).toPrecision(6);

        const result = {
          usd: {
            value: valueUSD,
            up: valueUSD > prevValueUSD
          },
          euro: {
            value: valueEUR,
            up: valueEUR > prevValueEUR
          }
        };

        console.log(data);
        console.log(result);

        return result;
      })
    );
  }
}
