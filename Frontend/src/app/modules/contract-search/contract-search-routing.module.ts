import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractSearchComponent } from './contract-search/contract-search.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'contract-search',
  },
  {
    path : 'contract-search',
    component : ContractSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractSearchRoutingModule { }
