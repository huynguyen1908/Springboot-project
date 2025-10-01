import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {JwtInterceptor} from './app/jwt-interceptor.interceptor';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideRouter(routes),
    provideAnimations()
  ]
});
