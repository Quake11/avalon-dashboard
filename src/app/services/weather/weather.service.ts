import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private updateTime = 60000;

  constructor(private http: HttpClient) {}

  private get _fetchCurrent$(): Observable<any> {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=Syktyvkar&appid=6313de79c44a82fd9cfc511de8b2ffbb&lang=ru&units=metric'
    );
  }

  private get _fetchForecast$(): Observable<any> {
    return this.http.get(
      // tslint:disable-next-line: max-line-length
      'https://api.openweathermap.org/data/2.5/forecast?q=Syktyvkar&appid=6313de79c44a82fd9cfc511de8b2ffbb&lang=ru&lang=eng&units=metric'
    );
  }

  private get _current$() {
    return this._fetchCurrent$.pipe(
      map(data => {
        const value = this.formatTemp(data.main.temp);
        const icon = this.getIconLink(data.weather[0].icon);
        return { value, icon };
      })
    );
  }

  private get _forecast$() {
    return this._fetchForecast$.pipe(
      map(data => {
        const nearestForecastTime = this._nearestForecastTime;
        const nearestForecast = data.list.find(
          f => f.dt === nearestForecastTime.time
        );
        const nearestForecastValue = this.formatTemp(nearestForecast.main.temp);
        const nearestForecastIcon = this.getIconLink(
          nearestForecast.weather[0].icon
        );

        const tomorrowForecastTime = this._tomorrowForecastTime;

        // Tomorrow Morning
        const tomorrowMorningForecast = data.list.find(
          f => f.dt === tomorrowForecastTime.morningTime
        );
        const tomorrowMorningForecastValue = this.formatTemp(
          tomorrowMorningForecast.main.temp
        );
        const tomorrowMorningForecastIcon = this.getIconLink(
          tomorrowMorningForecast.weather[0].icon
        );

        // Tomorrow Evening
        const tomorrowEveningForecast = data.list.find(
          f => f.dt === tomorrowForecastTime.eveningTime
        );

        const tomorrowEveningForecastValue = this.formatTemp(
          tomorrowEveningForecast.main.temp
        );
        const tomorrowEveningForecastIcon = this.getIconLink(
          tomorrowEveningForecast.weather[0].icon
        );

        // Result
        const result = {
          nearest: {
            type: nearestForecastTime.type,
            value: nearestForecastValue,
            icon: nearestForecastIcon,
          },
          tomorrow: {
            morning: {
              value: tomorrowMorningForecastValue,
              icon: tomorrowMorningForecastIcon,
            },
            evening: {
              value: tomorrowEveningForecastValue,
              icon: tomorrowEveningForecastIcon,
            },
          },
        };
        console.log(result);

        return result;
      })
    );
  }

  // return timestamp of nearest time we need forecast for and its type
  private get _nearestForecastTime(): { time: number; type: string } {
    const morning = new Date();
    const evening = new Date();
    let type: string;
    let time: number;

    if (this.isEvening) {
      type = 'morning';
      if (morning.getHours() >= 21) {
        morning.setDate(morning.getDate() + 1);
        morning.setHours(9, 0, 0, 0);
      } else if (morning.getHours() < 9) {
        morning.setHours(9, 0, 0, 0);
      }

      time = morning.getTime() / 1000;
    } else if (this.isDaytime) {
      type = 'evening';
      evening.setHours(21, 0, 0, 0);

      time = evening.getTime() / 1000;
    }
    return { time, type };
  }

  private get _tomorrowForecastTime(): {
    morningTime: number;
    eveningTime: number;
  } {
    const morning = new Date();
    const evening = new Date();

    morning.setDate(morning.getDate() + 1);
    morning.setHours(9, 0, 0, 0);

    evening.setDate(evening.getDate() + 1);
    evening.setHours(21, 0, 0, 0);

    const morningTime = morning.getTime() / 1000;
    const eveningTime = evening.getTime() / 1000;

    return { morningTime, eveningTime };
  }

  get currentRealtime$() {
    return timer(0, this.updateTime).pipe(switchMap(() => this._current$));
  }

  get forecastRealtime$() {
    return timer(0, this.updateTime).pipe(switchMap(() => this._forecast$));
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

  getIconLink(iconName: string) {
    return `assets/weather/${iconName}.svg`;
    // return `https://openweathermap.org/img/w/${iconName}.png`;
  }

  formatTemp(t: string): string {
    const temp = parseInt(t, 10);

    let result: string;
    if (temp > 0) {
      result = `+${temp}`;
    } else {
      result = `${temp}`;
    }
    return result;
  }

  isInt(n) {
    return n % 1 === 0;
  }
}
