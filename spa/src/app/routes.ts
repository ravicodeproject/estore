import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsComponent } from './lists/lists.component';
import { Routes } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeesComponent } from './emp/employees/employees.component';
import { EmployeeDetailComponent } from './emp/employee-detail/employee-detail.component';
import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';
import { EmployeesResolver } from './_resolvers/employees.resolver';
import { EmployeeEditComponent } from './emp/employee-edit/employee-edit.component';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'messages', component: MessagesComponent },
      { path: 'employees', component: EmployeesComponent,
      resolve: { employees: EmployeesResolver} },
      { path: 'employees/:id', component: EmployeeDetailComponent,
      resolve: { employee: EmployeeDetailResolver }},
      { path: 'employee/edit', component: EmployeeEditComponent,
      resolve: { employee: EmployeeEditResolver }, canDeactivate: [PreventUnsavedChanges]},
      { path: 'lists', component: ListsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
