import { Dashboard } from './../models/dashboard';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartData } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 public pieChartData: any = [];
 public xValues: any = [];
 barChartData !: Dashboard[];
 public yValues: any = [];
 dates: any[]=[];
 hours: any[]=[];

 constructor(public service: DashboardService) { }


 ngOnInit(): void {
  this.pieChart();
  this.barChart();
  this.salaryBarchart();

}

pieChart() {

  var pieColors = ["red","yellow"];

  this.service.GetEmployeeCount().subscribe(data => {
    this.pieChartData = data;
    new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Resigned_Employee', 'Active_Employee'],
        datasets: [{ data: this.pieChartData,
          backgroundColor: pieColors},],
      },
    })
  })
}




barChart() {

  var barColors = ["green"];

  var dpipe= new DatePipe('en-US');

  this.service.GetEmployeeWorkingHours().subscribe(data => {

    //console.log(this.barChartData);

    this.barChartData = data as Dashboard[];

    this.barChartData.forEach(e=>{

      this.dates.push(dpipe.transform(e.clockDate,'dd MMM yyyy'));

      this.hours.push(e.workingHours);

    })

    let barChart = new Chart('barChart', {

      type: 'bar',

      data: {

        labels: this.dates,

        datasets: [

          {

            backgroundColor: barColors,

            data: this.hours,

            label:"workingHours",

          }

        ],

      },

    });

  });

}

salaryBarChartData : any =[];

  SalaryClockDateValues : any = [];

  SalaryDataValues: any = [];

  salaryBarchart(){

    var barColors = ["brown"];

    var datePipe = new DatePipe('en-US');

    this.service.GetEmployeeSalary().subscribe(data =>{

    this.salaryBarChartData = data

    console.log("Salary Bar Chart",this.salaryBarChartData);

    this.salaryBarChartData.forEach((e: { clockDate: string | number | Date; salary: any; }) => {

      this.SalaryClockDateValues.push(datePipe.transform(e.clockDate,'dd-MMM-yyyy'));

      this.SalaryDataValues.push(e.salary);

    });

    new Chart("barChart2", {

      type: "bar",

      data: {

        labels: this.SalaryClockDateValues,

        datasets: [{

          backgroundColor: barColors,

          data: this.SalaryDataValues,

          label:'Salary',

        }]

      },

    });

    })

  }

}

