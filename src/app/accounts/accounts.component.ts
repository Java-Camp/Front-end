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

  accountsList:any;

  constructor(private data:UserDataService, public dialog: MatDialog, private acc:AccountService) {

  }

  accounts = this.data.accountList;

  openDialogCreate() {
    this.dialog.open(DialogCreate);
  }

  ngOnInit(): void {
    this.acc.getAccounts().subscribe( data => {
      this.accountsList = data;
      console.log(this.accountsList);

    });
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
  accOptions: string[] = ['Family', 'Personal', 'Savings'];

  currencyControle = new FormControl();
  currencies:any;
  currencyOptions: string[] = [];

  constructor(private snackBar: MatSnackBar, private acc: AccountService) {}

  ngOnInit(): void {
    this.acc.getCurrencies().subscribe(data=> {
      this.currencies = data;
      console.log(this.currencies);
      for (let d of this.currencies) {
        this.currencyOptions.push(d.name);
      }
    });

    this.filteredOptions = this.currencyControle.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currencyOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBar, {
      duration: this.durationInSeconds * 1000,
    });
  }

  createAccount(type:string, description:string, currencyName:string) {
    let currencyId;
    for(let currency of this.currencies) {
      if (currencyName == currency.name) {
        currencyId = currency.id;
      }
    }
    this.acc.createAccount(type, description, currencyId);
    window.location.reload();
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
