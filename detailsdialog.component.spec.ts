import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeDetailsService } from './../services/employee-details.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsdialogComponent } from './detailsdialog.component';
import { FormBuilder } from '@angular/forms';

fdescribe('DetailsdialogComponent', () => {
  let component: DetailsdialogComponent;
  let fixture: ComponentFixture<DetailsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsdialogComponent ],
      imports:[HttpClientTestingModule],
      providers: [FormBuilder,{provide:MatDialogRef,useValue:{}},
      {provide:MAT_DIALOG_DATA,useValue:{}},HttpClient,EmployeeDetailsService,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check valid form data',() =>{
    component.empFormGroup.controls['employeeId'].setValue('10002');
    component.empFormGroup.controls['empFirstName'].setValue('Pratiksa');
    component.empFormGroup.controls['empLastName'].setValue('Malode');
    component.empFormGroup.controls['empgender'].setValue('Female');
    component.empFormGroup.controls['empJoiningDate'].setValue('2022-02-01');
    component.empFormGroup.controls['empHourlySalaryRate'].setValue(66.900);
    component.empFormGroup.controls['comName'].setValue(6);
    component.empFormGroup.controls['designationName'].setValue(4);
    component.empFormGroup.controls['empResignationDate'].setValue('');
    expect(component.empFormGroup.valid).toBeTruthy();
  });


  it('checking FirstName valid or not',() =>{
    component.empFormGroup.controls['empFirstName'].setValue("Naman");
    expect(component.empFormGroup.controls['empFirstName'].valid).toBeTruthy();
    });


    it('checking designationName valid or not',() =>{
      component.empFormGroup.controls['designationName'].setValue("3");
      expect(component.empFormGroup.controls['designationName'].valid).toBeTruthy();
      });


      it('checking JoiningDate valid or not ',() =>{

        component.empFormGroup.controls['empJoiningDate'].setValue("2022-02-01");
        expect(component.empFormGroup.controls['empJoiningDate'].valid).toBeTruthy();
        });



   it('checking Invalid data Empty or not',() =>{
     component.empFormGroup.controls['empLastName'].setValue('');
     expect(component.empFormGroup.controls['empLastName'].valid).toBeFalsy();
   });

      it('checking invalid Length of data ',() =>{
        component.empFormGroup.controls['empFirstName'].setValue("qwertyuioasdfghjklxcvbnm,qwertyuioasdfghjkcvbn");
        expect(component.empFormGroup.controls['empFirstName'].valid).toBeFalsy();
        });

        it('checking HourlySalaryRate filling Invalid data',() =>{
          component.empFormGroup.controls['empHourlySalaryRate'].setValue("ffvhhbhgcfcgv");
          expect(component.empFormGroup.controls['empHourlySalaryRate'].valid).toBeFalsy();
        });

        it('checking Invalid form data its valid or Invalid',() =>{
          component.empFormGroup.controls['employeeId'].setValue('111111111111111111111105');
          component.empFormGroup.controls['empFirstName'].setValue('Namannnaa');
          component.empFormGroup.controls['empLastName'].setValue('solanki');
          component.empFormGroup.controls['empgender'].setValue('Female');
          component.empFormGroup.controls['empJoiningDate'].setValue('2022-09-05');
          component.empFormGroup.controls['empHourlySalaryRate'].setValue(30.700);
          component.empFormGroup.controls['comName'].setValue('6');
          component.empFormGroup.controls['designationName'].setValue('1');
          component.empFormGroup.controls['empResignationDate'].setValue('11');
          expect(component.empFormGroup.valid).toBeFalsy();
          })
});
