import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrent(): Observable<any> {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=Syktyvkar&appid=6313de79c44a82fd9cfc511de8b2ffbb&lang=ru&units=metric'
    );
  }

  getForecast() {
    return this.http.get(
      // tslint:disable-next-line: max-line-length
      'https://api.openweathermap.org/data/2.5/forecast?q=Syktyvkar&appid=6313de79c44a82fd9cfc511de8b2ffbb&lang=ru&lang=eng&units=metric'
    );
  }

  get currentTemp$() {
    return this.getCurrent().pipe(
      map(data => {
        const tempValue = this.formatTemp(data.main.temp);
        return tempValue;
      })
    );
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
      return `+${temp.toPrecision(2)}`;
    }
    if (temp < 0) {
      return `-${temp.toPrecision(2)}`;
    }
    return temp.toPrecision(2);
  }
}
