import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../services/auth/authentication.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login'], { replaceUrl: true });
          return false;
        }
      })
    );
  }
}
