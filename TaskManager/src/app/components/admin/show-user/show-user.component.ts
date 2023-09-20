import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {
  getUserData: Object;
  formopen: boolean = true;
  updateopen: boolean = false;

  createuserdata: FormGroup;
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
  }
  newUser: {};
  iname: string;
  iemail: string;
  ipassword: string;
  getupdateUser: any;
  uid: any;
  uname: any;
  uemail: any;
  upassword: any;
  urole: any;
  data: any;

  constructor(
    public formbuilder: FormBuilder,
    private http: NodeapiService,
    private notification: NotificationService,
    private loaderservice: GloballoaderService
  ) {
    this.getUserApi()
    this.createuserdata = this.formbuilder.group({

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
    });
  }

  ngOnInit(): void {

  }

  cancel() {
    this.formopen = true;
    this.updateopen = false;
  }

  onSubmit() {

  }

  getUserApi() {
    this.http.getUser().subscribe(
      (response) => {
        this.getUserData = response;
      }
    )
  }

  addUser(nname, nemail, npassword) {
    if (nname.length === 0 || nemail.length === 0 || npassword.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
      this.createuserdata.reset()
    }
    else {
      this.newUser = {
        name: nname,
        email: nemail,
        password: npassword,
        role: 'user'
      }
      this.http.postUser(this.newUser).subscribe()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getUserApi()
        this.createuserdata.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.openSuccessBar("User Data Added Successfully")
      }, 2000);

    }

  }

  editUser(index) {
    this.formopen = false;
    this.updateopen = true;
    this.http.getUserID(index).subscribe(
      (response) => {
        this.getupdateUser = response
        this.uid = index;
        this.uname = this.getupdateUser.name;
        this.uemail = this.getupdateUser.email;
        this.upassword = this.getupdateUser.password;
        this.urole = this.getupdateUser.role

      }
    )
  }
  updateUser(unname, uneamil, unpass,) {
    if (unname.length === 0 || uneamil.length === 0 || unpass.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
      this.createuserdata.reset()
    }
    else {
      this.formopen = true;
      this.updateopen = false;
      this.newUser = {
        name: unname,
        email: uneamil,
        password: unpass,
        role: 'user'
      }
      this.http.putUser(this.uid, this.newUser).subscribe()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getUserApi()
        this.createuserdata.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("User is Updated")
      }, 2000);

    }
  }

  delUser(id) {
    this.http.deleteUser(id).subscribe(response => {
      this.data = response;
      this.data = this.data.filter(item => item.id !== id)
    })
    this.loaderservice.show()
    setTimeout(() => {
      this.loaderservice.hide()
      this.getUserApi()
    }, 2000);
    setTimeout(() => {
      this.notification.openSuccessBar('User is Deleted Successfully')
    }, 2000);
  }

}
