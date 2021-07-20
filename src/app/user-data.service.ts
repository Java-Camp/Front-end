import { Injectable } from '@angular/core';
import data from './data.json';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  public user = new User(data.firstName, data.lastName, data.balance, data.email);
}

export class User {
  constructor(public firstName:string, public lastName:string, public balance:string, public email:string) {
  }
}
