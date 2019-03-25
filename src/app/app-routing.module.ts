import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: AddtaskComponent},
    {path: 'addtask', component: AddtaskComponent},
    {path: 'viewtask', component: ViewtaskComponent},
    {path: 'updatetask', component: UpdatetaskComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
