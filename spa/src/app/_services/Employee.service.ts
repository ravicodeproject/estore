import { IEmployee } from './../_models/IEmployee';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
/*
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};*/
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /*getEmployees(): Observable<IEmployee[]> {
    // return this.http.get<IEmployee[]>(this.baseUrl + 'employees/', httpOptions);
    return this.http.get<IEmployee[]>(this.baseUrl + 'employees/');
  }*/

  getEmployees(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<IEmployee[]>> {
    const paginatedResult: PaginatedResult<IEmployee[]> = new PaginatedResult<IEmployee[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('egender', userParams.egender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<IEmployee[]>(this.baseUrl + 'employees/', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getEmployee(id): Observable<IEmployee> {
    // return this.http.get<IEmployee>(this.baseUrl + 'employees/' + id, httpOptions);
    return this.http.get<IEmployee>(this.baseUrl + 'employees/' + id);
  }

  updateEmployee(id, employee) {
    return this.http.put<IEmployee>(this.baseUrl + 'employees/' + id, employee);
  }

}
