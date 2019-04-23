import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  updateTime = 30000;

  constructor(private http: HttpClient) { }

  private get _current$(): Observable<any> {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=Syktyvkar&appid=6313de79c44a82fd9cfc511de8b2ffbb&lang=ru&units=metric'
    );
  }

  private get _forecast$(): Observable<any> {
    return this.http.get(
      // tslint:disable-next-line: max-line-length
      'https://api.openweathermap.org/data/2.5/forecast?q=Syktyvkar&appid=6313de79c44a82fd9cfc511de8b2ffbb&lang=ru&lang=eng&units=metric'
    );
  }

  private get _currentTemp$() {
    return this._current$.pipe(
      map(data => {
        const tempValue = this.formatTemp(data.main.temp);
        return tempValue;
      })
    );
  }

  // TODO
  private get _forecastToday$() {
    return this._forecast$.pipe(
      map(data => {
        const date = new Date();

        const morning = date;
        const evening = date;

        let type: string;
        let value: string;

        if (this.isEvening) {
          type = 'morning';
          if (date.getHours() >= 21) {
            morning.setDate(morning.getDate() + 1);
            morning.setHours(9, 0, 0, 0);
          } else if (date.getHours() < 9) {
            morning.setHours(9, 0, 0, 0);
          }

          const dt = morning.getTime() / 1000;
          value = this.formatTemp(data.list.find(f => f.dt === dt).main.temp);
        }

        if (this.isDaytime) {
          type = 'evening';
          evening.setHours(21, 0, 0, 0);

          const dt = evening.getTime() / 1000;
          value = this.formatTemp(data.list.find(f => f.dt === dt).main.temp);
        }

        const result = { type, value };
        console.log(result);


        return result;
      })
    );
  }


  get currentTempRealtime$() {
    return timer(0, this.updateTime).pipe(switchMap(() => this._currentTemp$));
  }

  get forecastTodayRealtime$() {
    return timer(0, this.updateTime).pipe(switchMap(() => this._forecastToday$));
  }


  get isDaytime() {
    return new Date().getHours() < 21 && new Date().getHours() >= 9;
    /*  return (
      new Date().getTime() <
      new Date(new Date().setHours(21, 0, 0, 0)).getTime() / 1000
    ); */
  }

  get isEvening() {
    return !this.isDaytime;
  }

  formatTemp(t: string): string {
    const temp = parseFloat(t);
    if (temp > 0) {
      return `+${temp.toPrecision(1)}`;
    }
    if (temp < 0) {
      return `-${temp.toPrecision(1)}`;
    }
    return temp.toPrecision(1);
  }
}
