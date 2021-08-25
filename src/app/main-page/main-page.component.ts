import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserDataService, User } from "../user-data.service";
import { AccountService } from "../services/account.service";
import { OperationService } from "../services/operation.service";
import { CategoryService } from "../services/category.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public user = this.data.user;
  accData:any;
  currency = "";
  constructor(public dialog: MatDialog, private data:UserDataService, private acc:AccountService, private router: Router,
              private toastrService: ToastrService) {
    if (sessionStorage.getItem('idOfCurrentAccount') == null) {
      this.router.navigate(['/accounts']);
     this.toastrService.warning('Choose an account', 'Warning');
    }
    this.acc.getAccountById(sessionStorage.getItem('idOfCurrentAccount')).subscribe(data => {
      this.accData = data;
      console.log(this.accData);
    })
    setTimeout(() =>
      {
        this.acc.getCurrencyById(this.accData.currencyId).subscribe(data => {
          let c:any = data;
          this.currency = c.name;
        })
      },500);
  }

  openDialogIncome() {
    this.dialog.open(DialogIncome);
  }

  openDialogExpense() {
    this.dialog.open(DialogExpense);
  }

  openDialogTransaction() {
    this.dialog.open(DialogTransaction);
  }

  ngOnInit(): void {

  }
}

@Component({
  selector: 'dialog-income',
  templateUrl: './dialog-income.html',
  styleUrls: ['./dialog-income.scss']
})
export class DialogIncome implements OnInit {

  filteredOptions:any;
  durationInSeconds = 3;
  sumControle = new FormControl();
  firstControle = new FormControl();
  secondControle = new FormControl();
  incomeType:any;
  incomeOptions: string[] = [];
  // incomeDate: string[] = ['Once', 'Day', 'Week', 'Month', 'Year'];

  constructor(private snackBar: MatSnackBar, private operation:OperationService, private router: Router, private category:CategoryService) {}

  ngOnInit(): void {
    this.category.getIncomeCategory().subscribe(data => {
      console.log(data);
      this.incomeType = data;
      for(let t of this.incomeType) {
        this.incomeOptions.push(t.name);
      }
    });
    setTimeout(() =>
      {
        this.filteredOptions = this.firstControle.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },1000);
  }

  createOperation(sum:any, category:string) {
    let op = {
      "sum": sum,
      "accountId": sessionStorage.getItem("idOfCurrentAccount"),
      "operationTypeId": "81",
      "categoryId": "1"
    }
    this.operation.createOperation(op).subscribe(data => {
      console.log(data);
    });
    setTimeout(() =>
      {
        window.location.reload();
      },500);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.incomeOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBar, {
      duration: this.durationInSeconds * 1000,
    });
  }
}


@Component({
  selector: 'dialog-expense',
  templateUrl: './dialog-expense.html',
  styleUrls: ['./dialog-expense.scss']
})
export class DialogExpense implements OnInit {

  durationInSeconds = 3;
  filteredOptions:any;
  sumControle = new FormControl();
  firstControle = new FormControl();
  secondControle = new FormControl();
  incomeType:any;
  incomeOptions: string[] = [];
  //'Car', 'Entertainment', 'Food', 'Clothes', 'Transport', 'Gifts'
  // incomeDate: string[] = ['Once', 'Day', 'Week', 'Month', 'Year'];

  constructor(private snackBar: MatSnackBar, private operation:OperationService, private category:CategoryService) {}

  ngOnInit(): void {
    this.category.getExpenceCategory().subscribe(data => {
      console.log(data);
      this.incomeType = data;
      for(let t of this.incomeType) {
        this.incomeOptions.push(t.name);
      }
    });
    setTimeout(() =>
      {
        this.filteredOptions = this.firstControle.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },1000);
  }

  createOperation(sum:any, category:string) {
    let categoryId;
    for(let c of this.incomeType) {
      if (category == c.name) {
        categoryId = c.id;
      }
    }
    let op = {
      "sum": sum,
      "accountId": sessionStorage.getItem("idOfCurrentAccount"),
      "operationTypeId": "21",
      "categoryId": categoryId
    }
    this.operation.createOperation(op).subscribe(data => {
      console.log(data);
    });
    setTimeout(() =>
      {
        window.location.reload();
      },500);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.incomeOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBar, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'dialog-transaction',
  templateUrl: './dialog-transaction.html',
  styleUrls: ['./dialog-transaction.scss']
})
export class DialogTransaction implements OnInit {
  durationInSeconds = 3;
  accounts:any;
  filteredOptions:any;
  accountOptions: string[] = [];
  sumControle = new FormControl();
  accControle = new FormControl();
  constructor(private snackBar: MatSnackBar, private acc: AccountService, private operation:OperationService) {}

  ngOnInit(): void {
    this.acc.getAccounts().subscribe(data=> {
      this.accounts = data;
      console.log(this.accounts);
      for (let a of this.accounts) {
        if (a.id != sessionStorage.getItem("idOfCurrentAccount")) {
          this.accountOptions.push(a.alias);
        }
      }
    });
    setTimeout(() =>
      {
        this.filteredOptions = this.accControle.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },500);
  }

  createOperation(sum:any, account:string) {
    let accId;
    for (let acc of this.accounts) {
      if (account == acc.alias) {
        accId = acc.id;
      }
    }
    let op = {
      "sum": sum,
      "accountId": sessionStorage.getItem("idOfCurrentAccount"),
      "operationTypeId": "82",
      "categoryId": "61",
      "operationId": accId
    }
    console.log(op);
    this.operation.createOperation(op).subscribe(data => {
      console.log(data);
    });
    setTimeout(() =>
      {
        window.location.reload();
      },500);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.accountOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBar, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'snack-bar',
  templateUrl: 'snack-bar.html',
  styles: [`
    .snack {
      color: #fff;
    }
  `],
})
export class SnackBar {}
