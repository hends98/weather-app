import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.html',
  styleUrls: ['./forecast.scss']
})
export class Forecast {
  @Input() forecasts: SimpleForecast[] = [];

  // Format date
  formatDate(dt_txt: string): string {
    const date = new Date(dt_txt);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
