import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-1hs4w810n6lynfim.us.auth0.com',
      clientId: 'UDtHT9bLcRnOHhZyQG3gsGRIeQ7ntGo4',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};
