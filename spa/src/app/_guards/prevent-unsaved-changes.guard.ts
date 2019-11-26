import { CanDeactivate } from '@angular/router';
import { EmployeeEditComponent } from '../emp/employee-edit/employee-edit.component';
import { Injectable } from '@angular/core';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<EmployeeEditComponent> {
  canDeactivate(component: EmployeeEditComponent) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
