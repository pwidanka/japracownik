import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthServiceTest } from '../_services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthServiceTest);

  return authService.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      }
      
      router.navigate(['/login']);
      return false;
    })
  );
}; 