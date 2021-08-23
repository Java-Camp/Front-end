import { Component, OnInit } from '@angular/core';
import { UserDataService} from "../user-data.service";
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AccountService } from "../services/account.service";
import {ToastrService} from "ngx-toastr";

export interface Currency {
  id:any;
  name:string;
  country:string;
}

export interface AccountType{
  id:any;
  name:string
}
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accountsList:any;

  constructor(
    private data:UserDataService, public dialog: MatDialog, private acc:AccountService,
    private toastrService : ToastrService) {

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

  saveAccId(id:any) {
    sessionStorage.removeItem('idOfCurrentAccount');
    sessionStorage.setItem('idOfCurrentAccount', id);
  }

}

@Component({
  selector: 'dialog-create',
  templateUrl: './dialog-create.html',
  styleUrls: ['./dialog-create.scss']
})
export class DialogCreate implements OnInit {

  filteredOptions:any;
  durationInSeconds = 1;
  descriptionControle = new FormControl();
  firstControle = new FormControl();
  accOptions: AccountType[] = [];
  accTypes: any;
  currencyControle = new FormControl();
  currencies: any;
  currencyOptions: Currency[] = [];

  constructor(private snackBar: MatSnackBar, private acc: AccountService) {

  }


  ngOnInit(): void {
    this.acc.getCurrencies().subscribe(data=> {
      this.currencies = data;
      for (let d of this.currencies) {
        this.currencyOptions.push(<Currency>{id:d.id, name:d.name, country:d.country});
      }
      console.log(this.currencyOptions);
    });
    this.acc.getTypeOfAccount().subscribe(data=> {
      this.accTypes = data;
      for (let d of this.accTypes) {
        this.accOptions.push(<AccountType>{id:d.id,name:d.name});
      }
      console.log(this.accOptions);
    });
    setTimeout(() =>
      {
        this.filteredOptions = this.currencyControle.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },1000);



  }

  private _filter(value: string): Currency[] {
    const filterValue = value.toLowerCase();

    return this.currencyOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBar, {
      duration: this.durationInSeconds * 1000,
    });
  }

  createAccount(type:string, description:string, currencyName:string) {
    let currencyId;
    for(let currency of this.currencies) {
      if (currencyName == currency.country) {
        currencyId = currency.id;
      }
    }
    console.log(currencyId);
    this.acc.createAccount(type, description, currencyId);
    this.openSnackBar();
    setTimeout(() =>
      {
        window.location.reload();
      },1000);

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
