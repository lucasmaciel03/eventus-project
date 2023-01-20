import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(): Observable<any> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map((isAuthenticated) => {
        console.log('Found previous token, automatic login');
        if (isAuthenticated) {
          // Directly open inside area
          this.router.navigateByUrl('tabs/tab1', { replaceUrl: true });
          return false;
        } else {
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
