import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Auth2Guard } from './auth2.guard';

const routes: Routes = [

  {
    path:'',
    loadChildren: () => import('src/app/modules/login/login.module').then(a => a.LoginModule),
  },
  {
    path:'',
    loadChildren: () => import('src/app/modules/register-user/register-user.module').then(a => a.RegisterUserModule),
  },


  {
    path:'',
    canActivate: [AuthGuard],
    children: [
      {
        path:'',
        loadChildren: () => import('src/app/modules/home/home.module').then(a => a.HomeModule),
      },
      {
        path:'',
        loadChildren: () => import('src/app/modules/contract-search/contract-search.module').then(a => a.ContractSearchModule),
      },
      {
        path:'',
        loadChildren: () => import('src/app/modules/location-edit/location-edit.module').then(a => a.LocationEditModule),
      },
      {
        path:'',
        loadChildren: () => import('src/app/modules/team-search/team-search.module').then(a => a.TeamSearchModule),
      },
      {
        path:'',
        loadChildren: () => import('src/app/modules/employee-edit/employee-edit.module').then(a => a.EmployeeEditModule),
      },
    ]
  },
  {
    path:'',
    canActivate: [Auth2Guard],
    children: [
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
