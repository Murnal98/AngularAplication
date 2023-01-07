import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PracticeComponent } from './practice/practice.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent},
  { path: 'calculator', component:CalculatorComponent },
  { path: 'practice', component:PracticeComponent},
  { path: 'employee-attendance', component:EmployeeAttendanceComponent},
  { path: 'employee-details', component:EmployeeDetailsComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: 'Login', component:LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
