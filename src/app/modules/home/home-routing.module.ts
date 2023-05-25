import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'home',
  },
  {
    path : 'home',
    component : HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
