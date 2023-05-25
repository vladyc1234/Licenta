import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractSearchRoutingModule } from './contract-search-routing.module';
import { ContractSearchComponent } from './contract-search/contract-search.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    ContractSearchComponent
  ],
  imports: [
    CommonModule,
    ContractSearchRoutingModule,
    MaterialModule,
    MatCheckboxModule
  ]
})
export class ContractSearchModule { }
