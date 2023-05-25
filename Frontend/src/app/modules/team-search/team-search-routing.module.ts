import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamSearchComponent } from './team-search/team-search.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'team-search',
  },
  {
    path : 'team-search',
    component : TeamSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamSearchRoutingModule { }
