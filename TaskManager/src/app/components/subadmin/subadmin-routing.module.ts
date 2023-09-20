import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SubadimShowUserComponent } from './subadim-show-user/subadim-show-user.component';
import { SubadminheaderComponent } from './subadminheader/subadminheader.component';
import { SubadminhomeComponent } from './subadminhome/subadminhome.component';

const routes: Routes = [
  {path:'', component:SubadminheaderComponent,canActivate:[AuthGuard],children:[{path:'home',component:SubadminhomeComponent}]},
  {path:'', component:SubadminheaderComponent,canActivate:[AuthGuard],children:[{path:'showusers',component:SubadimShowUserComponent}]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubadminRoutingModule { }
