import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthServiceTest } from '../_services/auth.service';
import { map, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthServiceTest);

  return authService.isLoggedIn$.pipe(
    switchMap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return [false];
      }
      
      return authService.isEmployer$.pipe(
        map(isEmployer => {
          if (isEmployer) {
            router.navigate(['/']); // Redirect employers away
            return false;
          }
          return true; // Allow regular users
        })
      );
    })
  );
}; 