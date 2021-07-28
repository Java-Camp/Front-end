import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { UserDataService } from "../user-data.service";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    campaignOne: FormGroup;
    campaignTwo: FormGroup;
    expenses = this.data.expenseList;
    incomes = this.data.incomeList;
    displayedColumns: string[] = ['date', 'sum', 'type'];

    constructor(private data:UserDataService) {

      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();

      this.campaignOne = new FormGroup({
        start: new FormControl(new Date(year, month, 13)),
        end: new FormControl(new Date(year, month, 16))
      });

      this.campaignTwo = new FormGroup({
        start: new FormControl(new Date(year, month, 15)),
        end: new FormControl(new Date(year, month, 19))
      });
    }

    ngOnInit(): void {

    }
}
