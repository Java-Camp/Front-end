import { Component, OnInit, Input } from '@angular/core';
import { OperationService } from "../../services/operation.service";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor(private operation: OperationService) { }

  @Input() childMessage: any;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:any = [];
  public barChartType:any = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0], label: 'Expense'},
    {data: [0], label: 'Income'}
  ];

  ngOnInit(): void {
    console.log(this.childMessage);
    this.barChartLabels = [];
    console.log(this.barChartData[0].data);
    this.barChartData[0].data = [];
    this.barChartData[1].data = [];
    for(let m of this.childMessage) {
      let date = m.date[0] + "-" + m.date[1] + "-" + m.date[2];
      this.barChartLabels.push(date);
      this.barChartData[0].data.push(m.expense);
      this.barChartData[1].data.push(m.income);
    }
  }

}
