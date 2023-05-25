import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationEditRoutingModule } from './location-edit-routing.module';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { MaterialModule } from '../material/material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    LocationEditComponent
  ],
  imports: [
    CommonModule,
    LocationEditRoutingModule,
    MaterialModule,
    MatCheckboxModule
  ]
})
export class LocationEditModule { }
