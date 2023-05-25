import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'employee-edit',
  },
  {
    path : 'employee-edit',
    component : EmployeeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeEditRoutingModule { }
