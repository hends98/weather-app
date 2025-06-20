import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.module';


@Component({
  selector: 'app-login',
  imports: [...SHARED_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';

  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/home'], { queryParams: { user: this.username } });
    // if (this.username.trim()) {
    //   // For now, no auth service - just redirect with username param
    //   this.router.navigate(['/home'], { queryParams: { user: this.username } });
    // }
  }
}
