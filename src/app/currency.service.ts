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

  private get _currency$(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(
      'https://free.currconv.com/api/v7/convert?q=USD_RUB,EUR_RUB&compact=ultra&apiKey=dd8b32b19b601546b6a9'
    );
  }

  get currencyRealtime$() {
    return timer(0, this.updateTime).pipe(
      switchMap(() => this._currency$),
      map(data => {
        const result = {
          usd: parseFloat(data['USD_RUB']).toPrecision(6),
          euro: parseFloat(data['EUR_RUB']).toPrecision(6)
        };
        console.log(result);

        return result;
      })
    );
  }
}
