import { Employee } from './../models/employee';
import { EmployeeDetailsComponent } from './../employee-details/employee-details.component';
import { Designationmaster } from './../models/designationmaster';
import { Companymaster } from './../models/companymaster';
import { EmployeeDetailsService } from './../services/employee-details.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  MaxLengthValidator,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailsdialog',
  templateUrl: './detailsdialog.component.html',
  styleUrls: ['./detailsdialog.component.css'],
})
export class DetailsdialogComponent implements OnInit {
  public ownerForm!: FormGroup;
  actionBtn: string = 'Save';

  form!: FormGroup;
  company!: Companymaster[];
  designation!: Designationmaster[];
  employee: Employee = new Employee();

  // mployeee: Employee = new Employee();

  empFormGroup: FormGroup = new FormGroup({
    employeeId: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9- ]*')]),
    empFirstName: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z]*')]),
    empLastName: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern('[a-zA-Z]*')]),
    empgender: new FormControl('', [Validators.required]),
    empJoiningDate: new FormControl('', [Validators.required]),
    empResignationDate: new FormControl(''),
    empHourlySalaryRate: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern('[0-9.]*')]),
    //empCompanyId: new FormControl('', [Validators.required]),
    designationName: new FormControl('', [Validators.required]),
    comName: new FormControl('', [Validators.required]),
  });

  public myError = (controlName: string, errorName: string) => {
    return this.empFormGroup.controls[controlName].hasError(errorName);
  };

  showUpdateButton!: boolean;
  disableResignationDate!: boolean;
  showSaveButton!: boolean;
  empKey!: number;
  IsEmployeeIDExists!: boolean;
  ResignationDate!: boolean;
  empJoiningDate !: Date;
  IsEmployeeInUse!: boolean


  // emp:Employee = new Employee();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public employeeService: EmployeeDetailsService
  ) {
    this.empKey = data;
  }
  title: string = '';
  employeeKey: number = 0;
  // private dialogRef : MatDialogRef<DetailsdialogComponent>) { }

  ngOnInit(): void {
    console.log('empKey', this.empKey);
    if (this.empKey == 0) {
      console.log('save button', this.showSaveButton);
      this.title = 'Add Employee';
      this.showUpdateButton = false;
      this.ResignationDate = true;
      this.showSaveButton = true;
      console.log('save button', this.showSaveButton);
    } else {
      console.log('this.employeeKey');
      this.title = 'Edit Employee';
      this.showUpdateButton = true;
      this.ResignationDate = false;
      this.showSaveButton = false;
      this.GetEmployeeById(this.empKey);
    }

    this.GetallCompanyMasters();
    this.GetallDesignationMasters();
  }

  cancel() {

          this.dialogRef.close();

  }
     addemployee(): void {
    this.empFormGroup.markAllAsTouched();
    this.employeeService
      .GetEmployeeIdExists(this.employee.employeeId, this.empKey)
      .subscribe((data) => {
        this.IsEmployeeIDExists = data as boolean;
        if (this.IsEmployeeIDExists == false) {
          this.employeeService.postEmployee(this.employee).subscribe((data) => {
            Swal.fire({
              title: 'Success',
              text: 'Employee created successfully.',
              icon: 'success',
            });
            this.dialogRef.close();
          });
        } else {
          Swal.fire({
            title: 'Alert',
            text: 'EmployeeId allready exists.',
            icon: 'warning',
          });
        }
      });
  }

  Update() {

    if(this.employee.empJoiningDate!=this.employee.empJoiningDate){

      this.employee.empJoiningDate.setHours(this.employee.empJoiningDate.getHours()+5);

      this.employee.empJoiningDate.setMinutes(this.employee.empJoiningDate.getMinutes()+30);

    }

    if (
      this.employee.empJoiningDate != null &&
      this.employee.empResignationDate != null
    )

    {
      if (
        new Date(this.employee.empJoiningDate) >
        new Date(this.employee.empResignationDate)
      ) {
        Swal.fire({
          title: 'Alert',
          text: 'joiningdate is greater than resignationdate.',
          icon: 'warning',
        });

        return;
      }
    }

    // this.empFormGroup.markAllAsTouched();
    this.employeeService
      .GetEmployeeIdExists(this.employee.employeeId, this.empKey)
      .subscribe((data) => {
        this.IsEmployeeIDExists = data as boolean;
        if (this.IsEmployeeIDExists=true) {
          this.employeeService
            .putEmployee(this.empKey, this.employee)
            .subscribe((data) => {
              Swal.fire({
                title: 'Success',
                text: 'Employee created successfully.',
                icon: 'success',
              });
              this.dialogRef.close();
            });
        } else {
          Swal.fire({
            title: 'Alert',
            text: 'EmployeeId allready exists.',
            icon: 'warning',
          });
        }
      });
  }

  public GetEmployeeById(empkey: number) {
    this.employeeService.GetEmployeeById(empkey).subscribe((data) => {
      // console.log(data);
      console.log(data);
      this.employee = data as Employee;
      console.log('Employee Selected', this.employee.empFirstName);
    });
  }

  public GetallCompanyMasters = () => {
    this.employeeService.GetallCompanyMasters().subscribe((data) => {
      // console.log(data);
      this.company = data as Companymaster[];
      console.log(this.company);
    });
  };

  public GetallDesignationMasters = () => {
    this.employeeService.GetDesignationMaster().subscribe((data) => {
      this.designation = data as Designationmaster[];
    });
  };
}
