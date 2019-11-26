import { Component, OnInit, Input } from '@angular/core';
import { IEmployee } from 'src/app/_models/IEmployee';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: IEmployee;
  constructor() { }

  ngOnInit() {
  }

}
