import { Attendance } from './../models/attendance';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from './../services/attendance.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Companymaster } from '../models/companymaster';
import { EmployeeDetailsService } from '../services/employee-details.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})

export class EmployeeAttendanceComponent implements OnInit {
  showTable: boolean = false;
  SaveDisabled: boolean = true;
  attendance!: Attendance[];
  empCompanyID!: number;
  comId!: number;
  clockDate!: string;
  invalidtime!: string;
  filterDate!: Date;
  empFormGroup!: FormGroup;
  Timein!: string;
  Timeout!: string;
  empAtt: Attendance = new Attendance();
  company!: Companymaster[];
  maxDate!: any;
  AttendanceList!: Attendance[];
  emp_Id!: string;
  emp_Id1!: string;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  public hasError = (controlName: string, errorName: string) => {
    return this.empFormGroup.controls[controlName].hasError(errorName);
  };

  public displayedColumns = [
    'employeeID',
    'employeeName',
    'clockDate',
    'timein',
    'timeout',
    'remarks',
  ];

  public dataSource = new MatTableDataSource<Attendance>();
  displaycount: any;


  constructor(
    public attendanceService: AttendanceService,
    public employeeService: EmployeeDetailsService
  ){}


  ngOnInit() {
    this.GetallCompanyMaster();
    this.maxDate = new Date();
    this.empFormGroup = new FormGroup({
      comname: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }


  public loadAttendance = () => {
    if (this.empFormGroup.valid) {
      this.showTable = true;
      this.attendanceService
        .GetallAttendance(this.filterDate.toDateString(),this.comId)
        .subscribe((data) => {
          this.dataSource.data = data as Attendance[];
          this.dataSource.paginator = this.paginator;

          if (this.dataSource.data.length > 0) {
            this.SaveDisabled = false;
          }
        });
      }
      else {
      Swal.fire({
        title: 'Alert',
        text: 'Date and Company must be required.',
        icon: 'warning',
      });
    }
  };


  public GetallCompanyMaster = () => {
    this.employeeService.GetallCompanyMasters().subscribe((data) => {
      this.company = data as Companymaster[];
    });
  };


  SaveEmployeeAttendance() {
    let listAttendances = new Array<Attendance>();
    let invalid_data = new Array<string>();
    let invalid_time = new Array<string>();
    this.AttendanceList = this.dataSource.data;

    this.AttendanceList.forEach((item, _index) => {
      if (
        (item.timein != '' && item.timeout == '' && item.remarks == '') ||
        (item.timein == '' && item.timeout != '' && item.remarks == '') ||
        (item.timein == '' && item.timeout == '' && item.remarks != '') ||
        (item.timein != '' && item.timeout != '' && item.remarks == '') ||
        (item.timein == '' && item.timeout != '' && item.remarks != '') ||
        (item.timein != '' && item.timeout == '' && item.remarks != '')
      )
       {
        this.emp_Id = item.employeeID;
        invalid_data.push(this.emp_Id);
       }

      else {
        if (item.timein != 'Empty' && item.timeout != '' && item.remarks != '')
        {
          let attendance = new Attendance();
          attendance.employeekey = item.employeekey;
          attendance.clockDate = item.clockDate;
          attendance.timein = attendance.clockDate + 'T' + item.timein;
          attendance.timeout = attendance.clockDate + 'T' + item.timeout;
          attendance.creationDate = item.creationDate;
          attendance.remarks = item.remarks;
          listAttendances.push(attendance);
        }

        if (item.timein > item.timeout) {
          this.invalidtime = item.employeeID;
          invalid_time.push(this.invalidtime);
        }
      }
    });

    if (invalid_data.length > 0) {
      Swal.fire({
        title: 'Alert',
        text: 'All Field Are Mandatory EmployeeID=' + invalid_data,
        icon: 'warning',
      });
    }

      if (invalid_time.length > 0) {
        Swal.fire({
          title: 'Alert',
          text: 'TimeOut Should be greater than TimeIn Employee ID=' + invalid_time,
          icon: 'warning',
        });
      }

      if(invalid_data.length > 0 && invalid_time.length > 0 ){
        Swal.fire({
          title: 'Alert',
          text: 'TimeOut Should be greater than TimeIn Employee ID=' + invalid_time +' . All Field Are Mandatory EmployeeID=' + invalid_data,
          icon: 'warning',
        });

      }


    if (
      this.AttendanceList != null &&
      invalid_time.length == 0 &&
      invalid_data.length == 0
    )
     {
      this.attendanceService
        .PostallAttendance(listAttendances)
        .subscribe((_data) => {
          Swal.fire({
            title: 'Success',
            text: 'Attendance created successfully.',
            icon: 'success',
          });
        });
    }
  }

  doFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
