import { Router } from '@angular/router';
import { IEmployee } from 'src/app/_models/IEmployee';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

// @Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
// model: any = {};
employee: IEmployee ;
registerForm: FormGroup;
bsconfig: Partial<BsDatepickerConfig>;

constructor(private authService: AuthService,
            private router: Router,
            private alertify: AlertifyService,
            private fb: FormBuilder) { }

ngOnInit() {
  this.bsconfig = {
    containerClass: 'theme-red'
  };
  // this.registerForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
  //   confirmPassword: new FormControl('', Validators.required)
  // }, this.passwordMatchValidator);
  this.createRegisterForm();
}

passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
}

createRegisterForm() {
  this.registerForm = this.fb.group(
    {
      egender: ['male'],
      username: ['', Validators.required],
      efirstname: ['', Validators.required],
      elastname: ['', Validators.required],
      edateofbirth: [null, Validators.required],
      eemail: ['', Validators.required],
      enationality: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    { validator: this.passwordMatchValidator }
  );
}
register() {
  if (this.registerForm.valid) {
    this.employee = Object.assign({}, this.registerForm.value);
    this.authService.register(this.employee).subscribe(
       () => {
         this.alertify.success('registration successful');
       },
       error => {
         this.alertify.error(error);
       },
       () => {
         this.authService.login(this.employee).subscribe(() => {
           this.router.navigate(['/employees']);
         },
         error => {
           this.alertify.error('error occured while login' + error);
         });
       }
     );
  }
  // this.authService.register(this.model).subscribe(() => {
  //   this.alertify.success('registration successful');
  // }, error => {
  //   this.alertify.error(error);
  // });

  console.log(this.registerForm.value);
}


cancel() {
  this.cancelRegister.emit(false);
  this.alertify.message('Cancelled');
}

}
