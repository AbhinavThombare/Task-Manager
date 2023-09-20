import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { ShowsubadminComponent } from './showsubadmin/showsubadmin.component';
import { CreateuserComponent } from './createuser/createuser.component';



const routes: Routes = [
  // {path:'', component:AdminHeaderComponent,children:[{path:'showusers',component:ShowUserComponent}]},
  // {path:'', component:AdminHeaderComponent,canActivate:[AuthGuard],children:[{path:'showsubadmin',component:ShowsubadminComponent}]},
  // {path:'', component:AdminHeaderComponent,canActivate:[AuthGuard],children:[{path:'createuser',component:CreateuserComponent}]},

  {path:'', component:AdminHeaderComponent,canActivate:[AuthGuard], children: [{path: 'home',component: AdminHomeComponent}]},
  {path:'', component:AdminHeaderComponent,canActivate:[AuthGuard],children:[{path:'createuser',component:CreateuserComponent}]},

  // {path:'',component: AdminHomeComponent},
  // {path:'showusers',component:ShowUserComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
