import { Attendance } from './../models/attendance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  // postEmployeeattendance(listAttendance: any) {
  //   throw new Error('Method not implemented.');
  // }
  // GetallCompanyMasters() {
  //   throw new Error('Method not implemented.');
  // }

  private REST_API_SERVER = "http://localhost/PMAPI/api";

  constructor(private httpClient: HttpClient) {

  }
  public GetallAttendance(clockDate:string,companyId:number):Observable<Attendance[]>{
    return this.httpClient.get<Attendance[]>(this.REST_API_SERVER + "/EmployeeAttendances/allAttendance?FilterClockDate=" + clockDate +"&FilterCompanyID=" +companyId);

  }
  public PostallAttendance(empatt:Attendance[]):Observable<boolean>{
    return this.httpClient.post<boolean>(this.REST_API_SERVER + "/EmployeeAttendances/SaveAttendance", empatt);

  }
  //   return this.httpClient.post(this.REST_API_SERVER + "/EmployeeAttendances/allAttendance?FilterClockDate=" + clockDate +"&FilterCompanyID=" +companyId);
  // }


}

