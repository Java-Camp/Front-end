import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  accessToken:any;
  refreshToken:any;

  constructor(private http:HttpClient) { }

  public generateToken(email:string, password:string): Observable<boolean> {
    let headers = new HttpHeaders({ "content-type": "application/x-www-form-urlencoded"});
    let options = { headers: headers };
    let body = `username=${email}&password=${password}`;
    return this.http.post<any>('http://localhost:8091/api/login', body, options)
      .pipe(
        tap(tokens => {
          sessionStorage.setItem('currentUsername', email);
          sessionStorage.setItem('accessToken', tokens.accessToken);
          sessionStorage.setItem('refreshToken', tokens.refreshToken);
        }),
        mapTo(true),
        catchError(error => {
          // alert(error.error);
          return of(false);
        }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return sessionStorage.getItem('accessToken');
  }

  loggout() {
    sessionStorage.removeItem('idOfCurrentAccount');
    sessionStorage.removeItem('currentUsername');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

}
