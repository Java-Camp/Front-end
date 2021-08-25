import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) {}

  public createAccount(typeOfAccount:any, description:string, currencyId:any) {
    let body = {
      "accountTypeId":typeOfAccount,
      "alias":description,
      "currencyId":currencyId
    };
    console.log(body);

    this.http.post<any>('http://localhost:8091/api/accounts', body).subscribe( data => {
      console.log(data);
    })
  }

  public getAccounts() {
    return this.http.get('http://localhost:8091/api/accounts');
  }

  public getAccountById(id:any) {
    return this.http.get('http://localhost:8091/api/accounts/' + id);
  }

  public getCurrencies() {
    return this.http.get('http://localhost:8091/api/currencies');
  }

  public getCurrencyById(id:any) {
    return this.http.get('http://localhost:8091/api/currencies/' + id);
  }
  public getTypeOfAccount() {
    return this.http.get("http://localhost:8091/api/typeOfAccount");
  }

  public getCurrentUser() {
    return this.http.get("http://localhost:8091/api/users");
  }

  public changeUserInfo(info:any) {
    return this.http.put<any>("http://localhost:8091/api/users", info);
  }
}
