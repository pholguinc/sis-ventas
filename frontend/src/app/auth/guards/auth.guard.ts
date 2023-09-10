import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if (localStorage.getItem('token')) {
    console.log('paso por el can activate del guard');

    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
