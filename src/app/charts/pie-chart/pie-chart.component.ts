import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pieChartLabels = ['Car', 'Entertainment', 'Food', 'Clothes', 'Transport', 'Gifts'];
  public pieChartData = [100, 350, 150, 50, 5, 100];
  public pieChartType:any = 'pie';
  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#a319c2'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#a63ebd'],
      borderWidth: 2,
    }
  ];
}
