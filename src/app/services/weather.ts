import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '649411756e36d44a0a311eaa2e10a9c9';
  private geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) { }

  // converts a city name to geographic coordinates.
  getLatLon(city: string): Observable<{ lat: number; lon: number }> {
    const url = `${this.geoApiUrl}?q=${encodeURIComponent(city)}&limit=1&appid=${this.apiKey}`;

    return this.http.get<any[]>(url).pipe(
      map((results) => {
        const location = results[0];
        return {
          lat: location.lat,
          lon: location.lon,
        };
      })
    );
  }

  // fetches the weather forecast for those coordinates.
  getForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.forecastApiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
