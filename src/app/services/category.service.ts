import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, interval, of } from 'rxjs';
import { tap, map, mapTo, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getExpenceCategory() {
    return this.http.get("http://localhost:8091/api/categories");
  }
}
