import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-showsubadmin',
  templateUrl: './showsubadmin.component.html',
  styleUrls: ['./showsubadmin.component.scss']
})
export class ShowsubadminComponent implements OnInit {
  getSubAdminData: Object;
  newUser: { name: any; email: any; password: any; role: any; };
  formopen: boolean = true;
  updateopen: boolean = false;
  getupdateSubadmin: any;
  uid: any;
  uname: any;
  uemail: any;
  upassword: any;
  urole: any;
  data: any;

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
  constructor(
    private http: NodeapiService,
    public formbuilder: FormBuilder,
    private notification: NotificationService,
    private loaderservice: GloballoaderService
  ) {
    this.getSubAdminApi()
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

  getSubAdminApi() {
    this.http.getSubAdmin().subscribe(
      (response) => {
        this.getSubAdminData = response;
      }
    )
  }

  addUser(nname, nemail, npassword) {
    if (nname.length === 0 || nemail.length === 0 || npassword.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
    }
    else {
      this.newUser = {
        name: nname,
        email: nemail,
        password: npassword,
        role: 'subadmin'
      }
      this.http.postSubAdmin(this.newUser).subscribe()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getSubAdminApi()
        this.createuserdata.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("Sub-Admin is Added Successfully")
      }, 2000);
    }

  }


  editUser(index) {
    this.formopen = false;
    this.updateopen = true;
    this.http.getSubAdminID(index).subscribe(
      (response) => {
        this.getupdateSubadmin = response
        this.uid = index;
        this.uname = this.getupdateSubadmin.name;
        this.uemail = this.getupdateSubadmin.email;
        this.upassword = this.getupdateSubadmin.password;
        this.urole = this.getupdateSubadmin.role

      }
    )
  }

  updateUser(unname, uneamil, unpass) {
    if (unname.length === 0 || uneamil.length === 0 || unpass.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
    }
    else {
      this.formopen = true;
      this.updateopen = false;
      this.newUser = {
        name: unname,
        email: uneamil,
        password: unpass,
        role: 'subadmin'
      }
      this.http.putSubAdmin(this.uid, this.newUser).subscribe()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getSubAdminApi()
        this.createuserdata.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.openSuccessBar("Sub-Admin is Updated")
      }, 2000);

    }
  }

  delUser(id) {
    this.http.deleteSubAdmin(id).subscribe(response => {
      this.data = response;
      this.data = this.data.filter(item => item.id !== id)
    })
    this.loaderservice.show()
    setTimeout(() => {
      this.loaderservice.hide()
      this.getSubAdminApi()
    }, 2000);
    setTimeout(() => {
      this.notification.dataAddedSuccess('Sub-Admin is Deleted')
    }, 2000);
  }
}
