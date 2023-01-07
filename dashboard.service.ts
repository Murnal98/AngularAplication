import { Dashboard } from './../models/dashboard';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  GetCountEmployee() {
    throw new Error('Method not implemented.');
  }


private REST_API_SERVER = "http://localhost/PMAPI/api";
  constructor(private httpClient: HttpClient) {

  }
  public GetEmployeeCount(){
    return this.httpClient.get(this.REST_API_SERVER + "/Dashboard/EmployeeCount");
  }
  public GetEmployeeWorkingHours(){
    return this.httpClient.get<Dashboard[]>(this.REST_API_SERVER + "/Dashboard/EmployeeWorkingHours");
  }
  public GetEmployeeSalary(){
    return this.httpClient.get<Dashboard[]>(this.REST_API_SERVER + "/Dashboard/EmployeeSalary");
  }


}
