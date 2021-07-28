import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registration(firstname:string, lastname:string, email:string, password:string) {
    let headers = new HttpHeaders({ "content-type": "application/json"});
    let options = { headers: headers };
    let body = {
      "firstName":firstname,
      "lastName":lastname,
      "email":email,
      "password":password
    };
    return this.http.post<any>('http://localhost:8091/api/users/save', body, options)
      .pipe(
        mapTo(true),
        catchError(error => {
          return of(false);
        }));
  }

}
