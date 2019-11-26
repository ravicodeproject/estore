import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { EmployeeService } from '../_services/Employee.service';
import { IEmployee } from 'src/app/_models/IEmployee';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeEditResolver implements Resolve<IEmployee> {
    constructor(private eservice: EmployeeService,
                private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<IEmployee>  {
        return this.eservice.getEmployee(this.authService.decodedToken.nameid).pipe(catchError(error => {
            this.alertify.error('Problem retrieving your data');
            this.router.navigate(['/employees']);
            return of(null);
        }));
    }
}
