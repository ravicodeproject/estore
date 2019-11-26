import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { EmployeeService } from './../_services/Employee.service';
import { IEmployee } from 'src/app/_models/IEmployee';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeesResolver implements Resolve<IEmployee[]> {
    pageNumber = 1;
    pageSize = 10;

    constructor(private eservice: EmployeeService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IEmployee[]>  {
        return this.eservice.getEmployees(this.pageNumber, this.pageSize).pipe(catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/']);
            return of(null);
        }));
    }
}
