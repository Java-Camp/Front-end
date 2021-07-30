import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2021-07-19', '2021-07-20', '2021-07-21', '2021-07-22', '2021-07-23', '2021-07-24', '2021-07-25'];
  public barChartType:any = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [75, 49, 89, 31, 86, 35, 50], label: 'Expense'},
    {data: [48, 38, 65, 39, 66, 17, 80], label: 'Income'}
  ];

  ngOnInit(): void {
  }

}
