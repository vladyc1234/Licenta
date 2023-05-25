import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeEditRoutingModule } from './employee-edit-routing.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeeEditRoutingModule,
    MaterialModule,
    MatCheckboxModule
  ]
})
export class EmployeeEditModule { }
