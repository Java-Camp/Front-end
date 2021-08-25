import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import { OperationService } from "../../services/operation.service";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  chartData:any;
  public pieChartLabels:any = [];
  public pieChartData:any = [];
  public pieChartType:any = 'pie';
  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#a319c2', '#f2902e', '#2b5ee0', '#e349c4', '#44b837'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#a63ebd', '#eb9c4d', '#3d69d9', '#e665cc', '#58b54e'],
      borderWidth: 2,
    }
  ];

  constructor(private category:CategoryService, private operation:OperationService) { }

  ngOnInit(): void {
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.operation.getTodayOperation().subscribe(data => {
      console.log(data);
      this.chartData = data;
      for(let d of this.chartData) {
        this.pieChartLabels.push(d.category);
        this.pieChartData.push(d.sum);
      }
      console.log(this.chartData);

      if (this.chartData.length == 0) {
        this.pieChartLabels = ["Today you didn't do any operation"];
        this.pieChartData = [0];
      }
    });

  }
}
