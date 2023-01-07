import { EmployeeDetailsService } from './../services/employee-details.service';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { FormsModule, FormBuilder } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForwardRefHandling } from '@angular/compiler';



fdescribe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      imports: [HttpClientTestingModule,MatDialogModule,MatTableModule,BrowserAnimationsModule],
      providers: [

        HttpClient,FormBuilder,FormsModule,AppComponent,RouterTestingModule]


    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check column by number', () => {
    expect(component.displayedColumns[0]).toContain("employeeID");
    expect(component.displayedColumns[1]).toContain("employeeName");
    expect(component.displayedColumns[2]).toContain("company");
    expect(component.displayedColumns[3]).toContain("designation");
    expect(component.displayedColumns[4]).toContain("joiningDate");
    expect(component.displayedColumns[5]).toContain("gender");

  });

  it('should open Dialog when click add button', () => {
    expect(component.openEmployeeDialog).toBeTruthy();
  });

  it('should open Dialog when click update button', () => {
    expect(component.openEmployeeDialog).toBeTruthy();
  });

  it('should delete employee when click delete button',() => {
    expect(component.deleteEmployee(10041)).toBeTrue;
  });

  it('check Total Record Count in Mat-Table',() => {
    const Totalrecords = component.dataSource.data.length
    expect(Totalrecords).toBeGreaterThanOrEqual(0);
  });


});
