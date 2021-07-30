import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) {}

  public createAccount(typeOfAccount:string, description:string, currencyType:string) {
    let body = {
      "accountTypeId":this.getIdOfTypeAccount(typeOfAccount),
      "alias":description,
      "currencyId":2248
    };
    console.log(body);

    this.http.post<any>('http://localhost:8091/api/accounts/save', body).subscribe( data => {
      console.log(data);
    })
  }

  public getIdOfTypeAccount(typeOfAccount:string) {
    if (typeOfAccount == 'Family') {
      return 1;
    } else
    return 2;
  }
}
