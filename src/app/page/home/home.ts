import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.module';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  imports: [...SHARED_IMPORTS],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  user$;
  user = '';
  city = '';
  searchedCity = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = params['user'] || 'Guest';
    });
  }

  searchCity() {
    if (this.city.trim()) {
      this.searchedCity = this.city.trim();
      // Trigger actual API call here to get weather data if needed
    }
  }
}
