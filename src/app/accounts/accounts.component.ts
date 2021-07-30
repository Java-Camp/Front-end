import { Component, OnInit } from '@angular/core';
import { UserDataService} from "../user-data.service";
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AccountService } from "../services/account.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private data:UserDataService, public dialog: MatDialog) { }

  accounts = this.data.accountList;

  openDialogCreate() {
    this.dialog.open(DialogCreate);
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-create',
  templateUrl: './dialog-create.html',
  styleUrls: ['./dialog-create.scss']
})
export class DialogCreate implements OnInit {

  filteredOptions:any;
  durationInSeconds = 3;
  descriptionControle = new FormControl();
  firstControle = new FormControl();
  currencyControle = new FormControl();
  accOptions: string[] = ['Family', 'Personal', 'Savings'];
  currencyOptions: string[] = ['USD', 'EUR', 'UAH', 'RUB', 'PLN'];

  constructor(private snackBar: MatSnackBar, private acc: AccountService) {}

  ngOnInit(): void {
    this.filteredOptions = this.firstControle.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.accOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBar, {
      duration: this.durationInSeconds * 1000,
    });
  }

  createAccount(type:string, description:string, currency:string) {
    this.acc.createAccount(type, description, currency);
    this.openSnackBar();
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
