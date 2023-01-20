import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token = '';
  url = environment.api_url;
  session = environment.session;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    this.loadToken();
  }
  async loadToken() {
    const token = await Preferences.get({ key: this.session.TOKEN });

    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      if (token.value) {
        alert('login agains!');
      }

      this.isAuthenticated.next(false);
    }
  }
  login(credentials: any) {
    return this.http
      .post(`${this.url}/api/user/login`, credentials, this.headers)
      .pipe(
        map((data: any) => data),
        switchMap(async (data) => {
          // await Preferences.set({
          //   key: this.session.user_id,
          //   value: data.userId,
          // });

          return from(
            Preferences.set({ key: this.session.TOKEN, value: data })
          );
        }),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
  }
  async logout(): Promise<void> {
    await Preferences.remove({ key: this.session.TOKEN });

    this.isAuthenticated.next(false);
  }
}
