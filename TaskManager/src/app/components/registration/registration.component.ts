import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  cpass: any;
  RegistrationData: FormGroup;
  message_error = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter valid Name' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter valid Email' }
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
  newData: { name: any; email: any; password: any; role: string; };
  constructor(
    public formbuilder: FormBuilder,
    private router:Router,
    private http:NodeapiService,
    private notification:NotificationService,
    ) {
    this.RegistrationData = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newData = {
      name:this.RegistrationData.value.name,
      email:this.RegistrationData.value.email,
      password:this.RegistrationData.value.password,
      role:'user'
    }
    this.RegistrationData.reset();
    this.http.postUser(this.newData).subscribe()
    this.notification.dataAddedSuccess("Registration Successful")
    setTimeout(() => {
      this.notification.dataAddedSuccess('Please Login Now')
    }, 2000);
    this.router.navigate(['../'])

  }
}
