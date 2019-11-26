import { Pagination, PaginatedResult } from './../../_models/Pagination';
import { ActivatedRoute } from '@angular/router';
import { IEmployee } from '../../_models/IEmployee';
import { AlertifyService } from '../../_services/alertify.service';
import { EmployeeService } from '../../_services/Employee.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[];

  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(private eservice: EmployeeService, private alertify: AlertifyService,
              private route: ActivatedRoute ) {}

  ngOnInit() {
    // this.getEmployees();
    this.route.data.subscribe(data => {
      this.employees = data.employees.result;
      this.pagination = data.employees.pagination;
    });

    this.userParams.egender = '';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.egender = '';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
  // getEmployees() {
  //   this.eservice.getEmployees().subscribe(
  //     (employees: IEmployee[]) => {
  //       this.employees = employees;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  loadUsers() {
    this.eservice.getEmployees(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<IEmployee[]>) => {
        this.employees = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
