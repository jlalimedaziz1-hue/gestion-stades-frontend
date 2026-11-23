import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';
export const authGuard:CanActivateFn=()=>{const auth=inject(AuthService),router=inject(Router);if(auth.isLoggedIn())return true;auth.logout();return router.createUrlTree(['/login']);};
export const adminGuard:CanActivateFn=()=>{const auth=inject(AuthService),router=inject(Router);if(auth.isLoggedIn()&&auth.isAdmin())return true;return router.createUrlTree(auth.isLoggedIn()?['/stades']:['/login']);};
