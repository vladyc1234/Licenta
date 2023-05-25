import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamSearchRoutingModule } from './team-search-routing.module';

import { MatCheckboxModule} from '@angular/material/checkbox';
import { MaterialModule } from '../material/material.module';
import { TeamSearchComponent } from './team-search/team-search.component';

@NgModule({
  declarations: [
    TeamSearchComponent
  ],
  imports: [
    CommonModule,
    TeamSearchRoutingModule,
    MaterialModule,
    MatCheckboxModule
  ]
})
export class TeamSearchModule { }
