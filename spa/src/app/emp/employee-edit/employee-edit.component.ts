import { AuthService } from './../../_services/auth.service';
import { EmployeeService } from './../../_services/Employee.service';
import { AlertifyService } from './../../_services/alertify.service';
import { IEmployee } from './../../_models/IEmployee';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: IEmployee;
  bsconfig: Partial<BsDatepickerConfig>;
  lastactive: string;


  @ViewChild('editForm', { static: false }) editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.employee = data.employee;
      this.employee.edateofbirth = new Date(this.employee.edateofbirth);
      this.employee.created = new Date(this.employee.created);
      this.employee.lastActive = new Date(this.employee.lastActive);
      this.lastactive = this.employee.lastActive.toString();
      console.log(this.employee.edateofbirth);
    });
    this.bsconfig = {
      containerClass: 'theme-red'
    };
  }

  updateEmployee() {
    console.log(this.employee);
    this.employeeService.updateEmployee(this.authService.decodedToken.nameid, this.employee).subscribe(next => {
      this.alertify.success('Profile updated successfully.');
      this.editForm.reset(this.employee);
    }, error => {
      this.alertify.error(error);
    });

  }
}
