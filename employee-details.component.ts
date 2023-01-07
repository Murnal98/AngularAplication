import { Employee } from './../models/employee';
import { DetailsdialogComponent } from './../detailsdialog/detailsdialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeDetailsService } from '../services/employee-details.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public displayedColumns = ['employeeID', 'employeeName', 'company','designation','joiningDate','gender','update','delete'];


  public dataSource = new MatTableDataSource<Employee>();
Employee!:Employee;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  IsEmployeeInUse: boolean=false;

  constructor(public dialog: MatDialog, private employeeService:  EmployeeDetailsService,) {

   }

  ngOnInit() {
    this.getallemployee();
  }

  public openEmployeeDialog(empKey:number){
    const MatdialogConfig=new MatDialogConfig();

    let dialogConfig={
      width:'700',
      height:'600',
      data:empKey
    };

    let dialogRef=this.dialog.open(DetailsdialogComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result=>{
        this.getallemployee();

      });


  }
  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }
  public getallemployee = () => {
    this.employeeService.Getallemployee().subscribe((data)=>{
      console.log("data",data);
      this.dataSource.data = data as Employee[];
      console.log(this.dataSource.data);

    })
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  deleteEmployee(empKey:number){
    this.employeeService
    .GetCheckEmployeeIdinUse(empKey)
    .subscribe((data) =>{
      this.IsEmployeeInUse = data as boolean;
      if(this.IsEmployeeInUse)
      {
        // this.employeeService.deleteEmployee(empKey).subscribe((data) => {
        // })
      // } else {
        Swal.fire({
          title: 'Alert',
          text: 'EmployeeId allready exists.',
          icon: 'warning',
        });
          }
          else{
            Swal.fire({
              title: "are you sure",
              icon: "question",
              showDenyButton: true,
              confirmButtonText: 'Yes',
              denyButtonText: 'No',
            }).then ((result)=>{
              if (result.isConfirmed){
                this.employeeService.deleteEmployee(empKey).subscribe((data) => {
                  Swal.fire({
                    title: "Success", text: "Employee Deleted successfully.", icon: "success"
                  });
                  this.getallemployee();


                })

              }

            })


          }
      });



  }


}
