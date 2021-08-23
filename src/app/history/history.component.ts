import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { UserDataService } from "../user-data.service";
import { OperationService } from "../services/operation.service";

export interface Operation {
  type:string;
  date:any;
  sum:number;
  category:string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    campaignOne: FormGroup;
    campaignTwo: FormGroup;
    // expenses = this.data.expenseList;
    // incomes = this.data.incomeList;
    displayedColumns: string[] = ['date', 'sum', 'type'];

    operations:any;
    income: Operation[] = [];
    expense: Operation[] = [];

    constructor(private data:UserDataService, private operation:OperationService) {

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

    getOperationsByDate(date:any) {
      console.log(date.end);
      let filter = {
        "firstDate": date.start,
        "secondDate": date.end
      }
      this.operation.getOperationsByDate(filter).subscribe(data => {
        this.income = [];
        this.expense = [];
        console.log(data);
        this.operations = data;
        for(let o of this.operations) {
          if (o.type == "Incomes") {
            this.income.push(<Operation>{type:o.type, date:o.date, sum:o.sum, category:o.category});
          } else {
            this.expense.push(<Operation>{type:o.type, date:o.date, sum:o.sum, category:o.category});
          }
        }
        console.log(this.income);
        console.log(this.expense);


      })
    }

    ngOnInit(): void {

    }
}
