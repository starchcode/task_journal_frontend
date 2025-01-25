import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { headerReducer } from './store/header.reducer';
import { provideHttpClient } from '@angular/common/http';
import { tasksReducer } from './store/tasks.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      {
        header: headerReducer,
        tasks: tasksReducer
      },
    )]
};
