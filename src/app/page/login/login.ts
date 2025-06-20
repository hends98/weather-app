import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared.module';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  imports: [...SHARED_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = true;
  isAuthenticated = false;
  constructor() {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      this.loading = false;

      if (isAuth) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/home' }
    });
  }
}
