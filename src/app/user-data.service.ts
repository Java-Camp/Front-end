import { Injectable } from '@angular/core';
import data from './data.json';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  public accountList = data.accounts;

  public expenseList = data.expense;

  public incomeList = data.income;

  public user = new User(data.firstName, data.lastName, data.balance, data.email, data.todayIncome, data.todayExpense);
}

export class User {
  constructor(public firstName:string, public lastName:string, public balance:string,
    public email:string, public income:string, public expense:string) {
  }
}
