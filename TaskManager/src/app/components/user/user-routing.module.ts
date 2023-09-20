import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { CreatetaskComponent } from './createtask/createtask.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { UserhomeComponent } from './userhome/userhome.component';

const routes: Routes = [
  {path:'', component:UserheaderComponent,canActivate:[AuthGuard],children:[{path:'home',component:UserhomeComponent}]},
  {path:'', component:UserheaderComponent,children:[{path:'task',component:CreatetaskComponent}]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
