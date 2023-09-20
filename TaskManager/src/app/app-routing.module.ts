import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPassComponent } from './components/forgotPass/forgot-pass/forgot-pass.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
// import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
// import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
// import { ShowUserComponent } from './components/admin/show-user/show-user.component';
// import { ShowsubadminComponent } from './components/admin/showsubadmin/showsubadmin.component';
// import { HeaderComponent } from './components/header/header.component';

// import { SubadimShowUserComponent } from './components/subadmin/subadim-show-user/subadim-show-user.component';
// import { SubadminheaderComponent } from './components/subadmin/subadminheader/subadminheader.component';
// import { SubadminhomeComponent } from './components/subadmin/subadminhome/subadminhome.component';
// import { CreatetaskComponent } from './components/user/createtask/createtask.component';
// import { UserheaderComponent } from './components/user/userheader/userheader.component';
// import { UserhomeComponent } from './components/user/userhome/userhome.component';
// import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  
  {path:'',component:LoginComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:LoginComponent},
  {path:'forgotpassword', component:ForgotPassComponent},
  
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},
 
  { path: 'subadmin', loadChildren: () => import('./components/subadmin/subadmin.module').then(m => m.SubadminModule)},

  { path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)},

  {path:'**',component:PageNotFoundComponent}





  // {path:'',redirectTo:'/login'},
  // {path: 'login',component: LoginComponent, children: [{path: 'registration', component: RegistrationComponent}]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
