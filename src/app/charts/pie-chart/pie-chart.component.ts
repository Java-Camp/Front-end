import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service";
import { OperationService } from "../../services/operation.service";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
//'Car', 'Entertainment', 'Food', 'Clothes', 'Transport', 'Gifts'
  chartData:any;
  public pieChartLabels:any = [];
  public pieChartData:any = [];
  public pieChartType:any = 'pie';
  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#a319c2'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#a63ebd'],
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
