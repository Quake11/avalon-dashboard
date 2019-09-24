import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Flight {
  departure: string;
  thread: { number: string; title: string; uid: string };
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private updateTime = 60 * 60000;

  constructor(private http: HttpClient) {}

  private get _flights$(): Observable<Flight[]> {
    const apiKey = 'f44b5477-b410-40b1-b8b0-e7b9c3c95a8f&station=s9623562';
    return this.http
      .get<{ schedule: Flight[] }>(
        `https://api.rasp.yandex.net/v3.0/schedule/?apikey=${apiKey}&lang=ru_RU&transport_types=plane`
      )
      .pipe(
        map(({ schedule }) =>
          schedule
            .map(s => {
              s.thread.title = s.thread.title.split('—')[1].trim();
              return s;
            })
            .filter(s => {
              return (
                new Date('01/01/2000 ' + s.departure) >
                new Date('01/01/2000 ' + new Date().toTimeString())
              );
            })
            .slice(0, 4)
        )
      );
  }

  public get flightsRealtime$() {
    return timer(0, this.updateTime).pipe(
      switchMap(() => this._flights$),
      map(data => {
        console.log(data);

        return data;
      })
    );
  }
}
