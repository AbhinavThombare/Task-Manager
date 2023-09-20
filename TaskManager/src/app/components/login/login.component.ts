import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service'
import { GloballoaderService } from 'src/app/services/globalloader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  message_error = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter Valid Email Address' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
    ],
  }
  iemail: any;
  ipass: any;
  dataAllUser: any;
  count: boolean = true;
  username: string;
  subscription: any;
  anyuser: string;
  messageForTeacher: string;
  session: Storage;
  constructor(
    public formBuilder: FormBuilder, 
    private http: NodeapiService, 
    private authser: AuthService, 
    private router: Router, 
    private notification:NotificationService,
    private loaderService:GloballoaderService,
    ) {

    this.loginform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ])),

    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.iemail = this.loginform.value.email;
    this.ipass = this.loginform.value.password

    this.http.getAllUser().subscribe(res => {
      this.dataAllUser = res;
      this.dataAllUser.find((a: any) => {
        if (a.email === this.iemail && a.password === this.ipass) {
          this.username = a.name;
          if (a.role === 'admin') {
            this.loginform.reset();
            this.router.navigate(['admin/home'])
            localStorage.setItem('admin', this.username);
            this.authser.loggedIn()
            this.notification.openSuccessBar("Login Successful, Welcome "+ this.username)
            this.count=false
           
            
          }
          else if (a.role === 'subadmin') {
            this.loginform.reset();
            this.router.navigate(['subadmin/home'])
            localStorage.setItem('subadmin', this.username)
            this.authser.loggedIn()
            this.notification.openSuccessBar("Login Successful, Welcome "+ this.username)
            this.count=false
            
           
          }
          else if (a.role === 'user') {
            this.loginform.reset();
            this.router.navigate(['user/home'])
            localStorage.setItem('user', this.username)
            this.authser.loggedIn();
            this.notification.openSuccessBar("Login Successful, Welcome "+ this.username)
            this.count=false
            
          }
        }
        if(this.count){
          this.notification.openErrorBar("Email or Password is Wrong")
          this.loginform.reset()
        }
      })
    })
  }

}
