import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserDataService, User } from "../user-data.service";

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
  selector: 'snack-bar',
  templateUrl: 'snack-bar.html',
  styles: [`
    .snack {
      color: #fff;
    }
  `],
})
export class SnackBar {}
