import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterUserRoutingModule } from './register-user-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    RegisterUserRoutingModule,
    MaterialModule
  ]
})
export class RegisterUserModule { }
