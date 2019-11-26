import { appRoutes } from './routes';
import { Routes, Router, RouterModule } from '@angular/router';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, CollapseModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import {TimeAgoPipe} from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';
import { EmployeesComponent } from './emp/employees/employees.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { EmployeeCardComponent } from './emp/employee-card/employee-card.component';
import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';
import { EmployeesResolver } from './_resolvers/employees.resolver';
import { EmployeeDetailComponent } from './emp/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './emp/employee-edit/employee-edit.component';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

export function tokenGetter(): string {
  return localStorage.getItem('token') ;
}

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    EmployeesComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    ListsComponent,
    MessagesComponent,
    EmployeeCardComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter, // have added to rule 'object-literal-shorthand' to tslint
        whitelistedDomains: ['localhost:5001'],
        blacklistedRoutes: ['localhost:5001/api/auth']
      }
    }),
    NgxGalleryModule
  ],
  providers: [
    ErrorInterceptorProvider,
    EmployeeDetailResolver,
    EmployeesResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    EmployeeEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
