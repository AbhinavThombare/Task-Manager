import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowUserComponent } from './components/admin/show-user/show-user.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { SubadminheaderComponent } from './components/subadmin/subadminheader/subadminheader.component';
import { UserheaderComponent } from './components/user/userheader/userheader.component';
import { ShowsubadminComponent } from './components/admin/showsubadmin/showsubadmin.component';
import { SubadminhomeComponent } from './components/subadmin/subadminhome/subadminhome.component';
import { UserhomeComponent } from './components/user/userhome/userhome.component';
import { SubadimShowUserComponent } from './components/subadmin/subadim-show-user/subadim-show-user.component';
import { CreatetaskComponent } from './components/user/createtask/createtask.component';
import {AuthGuard} from './guard/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GloballoaderComponent } from './components/globalloader/globalloader.component';
import { FirstcapitalPipe } from './pipes/firstcapital.pipe';
import { ForgotPassComponent } from './components/forgotPass/forgot-pass/forgot-pass.component';
import { FiltertaskPipe } from './pipes/filtertask.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    AdminHomeComponent,
    ShowUserComponent,
    AdminHeaderComponent,
    SubadminheaderComponent,
    UserheaderComponent,
    ShowsubadminComponent,
    SubadminhomeComponent,
    UserhomeComponent,
    SubadimShowUserComponent,
    CreatetaskComponent,
    PageNotFoundComponent,
    GloballoaderComponent,
    FirstcapitalPipe,
    ForgotPassComponent,
    FiltertaskPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})

export class AppModule { }
