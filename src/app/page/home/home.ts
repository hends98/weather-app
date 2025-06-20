import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.module';
import { AuthService } from '@auth0/auth0-angular';
import { WeatherService } from '../../services/weather';
import { Forecast } from '../../components/forecast/forecast';


interface SimpleForecast {
  dt: number;
  temp: number;
  feels_like: number;
  humidity: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  wind_speed: number;
  visibility: number;
  pop: number;
  date_text: string;
}


@Component({
  selector: 'app-home',
  imports: [...SHARED_IMPORTS, Forecast],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  user$;
  user = '';
  city: string = '';
  weather: any;
  forecastData: SimpleForecast[] = [];
  forecast: any
  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private auth: AuthService
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = params['user'] || 'Guest';
    });
  }

  searchWeather() {
    if (!this.city.trim()) return;

    this.weatherService.getLatLon(this.city).subscribe({
      next: ({ lat, lon }) => {
        this.weatherService.getForecast(lat, lon).subscribe({
          next: (data) => {
            this.forecast = data;

            //Clean up data to display/get relevant items only
            this.forecastData = data.list.map((item: any) => ({
              dt: item?.dt,
              temp: item?.main?.temp,
              feels_like: item?.main?.feels_like,
              humidity: item?.main?.humidity,
              weather: item?.weather[0],
              wind_speed: item?.wind?.speed,
              visibility: item?.visibility,
              pop: item?.pop,
              date_text: item?.dt_txt,
            }));
          },
          error: (err) => console.error('Forecast error:', err),
        });
      },
      error: (err) => console.error('Geolocation error:', err),
    });
  }

  clearInput() {
    this.city = '';
    this.forecast = null;
    this.forecastData = [];
  }
}
