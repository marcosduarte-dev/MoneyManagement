import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static habilitarSidenav = new EventEmitter<boolean>();
  static habilitarNavbar = new EventEmitter<boolean>();

  baseUrl = environment.baseUrl + '/accounts/api/auth/';

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post<any>(this.baseUrl, {username, password}, httpOptions).pipe(
      map(user => {
        if (user && user.token) {
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          AuthService.habilitarNavbar.emit(true);
          AuthService.habilitarSidenav.emit(true);
        }
        return user;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('currentUser')
  }

}
