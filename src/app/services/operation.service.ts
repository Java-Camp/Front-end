import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http:HttpClient) { }

  public createOperation(operation:any) {
    console.log(operation);
    return this.http.post<any>('http://localhost:8091/api/operations', operation);
  }

  public getOperationsByDate(filter:any) {
    console.log(filter);
    return this.http.post<any>('http://localhost:8091/api/operations/' + sessionStorage.getItem("idOfCurrentAccount"), filter);
  }

  public getTodayOperation() {
    return this.http.get('http://localhost:8091/api/operations/' + sessionStorage.getItem("idOfCurrentAccount"));
  }

  public getAllByDateRange(filter:any) {
    console.log(filter);
    return this.http.post<any>('http://localhost:8091/api/operations/' + sessionStorage.getItem("idOfCurrentAccount") + '/getByRange', filter);
  }
}
