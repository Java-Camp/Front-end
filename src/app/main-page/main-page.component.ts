import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserDataService, User } from "../user-data.service";
import { AccountService } from "../services/account.service";
import { OperationService } from "../services/operation.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public user = this.data.user;

  constructor(public dialog: MatDialog, private data:UserDataService) {}

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
  incomeOptions: string[] = ['Job', 'Gift', 'Credit'];
  incomeDate: string[] = ['Once', 'Day', 'Week', 'Month', 'Year'];

  constructor(private snackBar: MatSnackBar, private operation:OperationService) {}

  ngOnInit(): void {
    this.filteredOptions = this.firstControle.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  createOperation(sum:any, category:string, date:any) {
    let op = {
      "dateTime":"2021-12-31",
      "sum":sum,
      "accountId": "121",
      "oppeerationTypeId":"1",
      "categoryId":"1"
    }
    this.operation.createOperation(op).subscribe(data => {
      console.log(data);
    });
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
  incomeOptions: string[] = ['Car', 'Entertainment', 'Food', 'Clothes', 'Transport', 'Gifts'];
  incomeDate: string[] = ['Once', 'Day', 'Week', 'Month', 'Year'];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.filteredOptions = this.firstControle.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
  constructor(private snackBar: MatSnackBar, private acc: AccountService) {}

  ngOnInit(): void {
    this.acc.getAccounts().subscribe(data=> {
      this.accounts = data;
      console.log(this.accounts);
      for (let a of this.accounts) {
        this.accountOptions.push(a.alias);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.accountOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  transfer(sum:any, alias:string) {
    let accId;
    for (let acc of this.accounts) {
      if (alias == acc.alias) {
        accId = acc.id;
      }
    }
    console.log(accId + " " + sum);

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
