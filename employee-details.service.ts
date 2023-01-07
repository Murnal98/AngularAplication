import { Employee } from './../models/employee';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  //private REST_API_SERVER = "https://astoriatrainingjaishree.azurewebsites.net/api";
  private REST_API_SERVER = "http://localhost/PMAPI/api";
  url: string | undefined;

  constructor(private httpClient: HttpClient) {

  }

  public Getallemployee(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters/allemployee");
  }

  public GetEmployeeMasters(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters");
  }

  public GetallCompanyMasters(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters/allCompaniesName");
  }

  public GetDesignationMaster(){
    return this.httpClient.get(this.REST_API_SERVER + "/EmployeeMasters/alldesignationName");
  }

  public GetEmployeeById(empKey: number){
    return this.httpClient.get(this.REST_API_SERVER +"/EmployeeMasters/" +empKey);
  }

  public postEmployee(employee: Employee){
    return this.httpClient.post(this.REST_API_SERVER +"/EmployeeMasters/",employee);
  }

  public putEmployee(empkey: number, employee: Employee):Observable<Employee>{
    return this.httpClient.put<Employee>(this.REST_API_SERVER + "/EmployeeMasters/"+empkey ,employee);
  }

  public GetEmployeeIdExists(employeeId:string,employeeKey:number):Observable<boolean>{
  return this.httpClient.get<boolean>(this.REST_API_SERVER + "/Employeemasters/CheckEmployeeIDExists?EmployeeID=" + employeeId +"&employeeKey=" + employeeKey)

 }
 public deleteEmployee(empkey: number){
 return this.httpClient.delete(this.REST_API_SERVER + "/EmployeeMasters/"+ empkey );
 }

 public GetCheckEmployeeIdinUse(employeeKey:number):Observable<boolean>{
  return this.httpClient.get<boolean>(this.REST_API_SERVER + "/Employeemasters/CheckEmployeeIdinUse?EmployeeKey=" + employeeKey);
 }





  }



