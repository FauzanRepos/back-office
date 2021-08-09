import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {employeeModel} from "../_model/data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private mockEmployee: employeeModel[] = [
    {
      id: 1,
      basicSalary: 9000000,
      email: 'test@test.com',
      username: 'test',
      description: 'just random description',
      group: 'coldplay',
      firstName: 'one',
      status: 'active',
      lastName: 'two',
      birthDate: '10/01/2021'
    }
  ];

  constructor() { }

  getEmployees(): Observable<employeeModel[]> {
    return of(this.mockEmployee);
  }

  getEmployee(id: number): Observable<employeeModel> {
    return of(this.mockEmployee.find(data => data.id.toString() === id.toString())!);
  }

  addEmployee(data: employeeModel): Observable<null> {
    this.mockEmployee.push(data);
    return of();
  }

  editEmployee(ids: number, data: employeeModel): Observable<null> {
    this.mockEmployee[this.mockEmployee.findIndex(el => el.id === ids)] = data;
    return of();
  }

  removeEmployee(id: number): Observable<null> {
    this.mockEmployee = this.mockEmployee.filter(function(item) {
      return item.id != id;
    });
    return of();
  }
}
