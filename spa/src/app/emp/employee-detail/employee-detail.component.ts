import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { EmployeeService } from './../../_services/Employee.service';
import { IEmployee } from 'src/app/_models/IEmployee';
import { Component, OnInit } from '@angular/core';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: IEmployee;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  lastactive: string;

  constructor(
    private eservice: EmployeeService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.getEmployee();
    this.route.data.subscribe(data => {
      this.employee = data.employee;
      this.lastactive = this.employee.lastActive.toString();
    });

    this.galleryOptions = [
      {},
      {
        breakpoint: 500,
        width: '300px',
        height: '300px',
        thumbnailsColumns: 3
      },
      { breakpoint: 300, width: '100%', height: '200px', thumbnailsColumns: 2 }
      // {
      //   breakpoint: 500,
      //   width: '300px',
      //   height: '300px',
      //   imagePercent: 100,
      //   thumbnailsColumns: 4,
      //   imageAnimation: NgxGalleryAnimation.Slide,
      //   preview: false
      // },
      // {
      //   breakpoint: 300,
      //   width: '100%',
      //   height: '200px',
      //   imagePercent: 100,
      //   thumbnailsColumns: 4,
      //   imageAnimation: NgxGalleryAnimation.Slide,
      //   preview: false
      // }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.employee.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  // getEmployee() {
  //   this.eservice.getEmployee( +this.route.snapshot.params.id).subscribe((employee: IEmployee) => {
  //     this.employee = employee;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
