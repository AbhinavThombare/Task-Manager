import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  forgotpass1: FormGroup;
  forgotpass2: FormGroup;
  form1: boolean = true;
  form2: boolean = false;

  message_error = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter Valid Name' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter Valid Email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 6 characters' },
      { type: 'maxlength', message: 'Password must not be above 30 characters' }
    ],
    'cpassword': [
      { type: 'required', message: 'Confirm Password is required' },
    ],
  }
  uname: any;
  uemail: any;
  checkuser: Object;
  data: { password: any; };


  constructor(
    private formbuilder: FormBuilder,
    private http: NodeapiService,
    private notification: NotificationService,
    private loaderservice: GloballoaderService,
    private router: Router,

  ) {
    this.forgotpass1 = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
    this.forgotpass2 = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.uname = this.forgotpass1.value.name;
    this.uemail = this.forgotpass1.value.email;
    this.http.checkuser(this.uname, this.uemail).subscribe((response) => {
      if (response) {
        this.loaderservice.show()
        setTimeout(() => {
          this.loaderservice.hide()
          this.form1 = false;
          this.form2 = true;
        }, 2000);
      }
      else {
        this.loaderservice.show()
        setTimeout(() => {
          this.loaderservice.hide()
          this.notification.openErrorBar('User not found')
          this.forgotpass1.reset()
        }, 2000);
      }
    })

  }

  onSubmit1() {
    this.data = {
      password: this.forgotpass2.value.password
    }
    this.http.changepass(this.uname, this.uemail, this.data).subscribe()
    this.loaderservice.show()
    setTimeout(() => {
      this.loaderservice.hide()
      this.router.navigate(['../login'])
    }, 2000);
    this.notification.openSuccessBar('Password is Updated')
  }

}


