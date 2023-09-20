import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  getUserData: Object;
  getSubAdminData:Object
  formopen: boolean = false;
  updateopen: boolean = false;
  btndiv:boolean = true;
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
  newUser: { name: any; email: any; password: any; role: any; };
  getupdatesub: any;

  constructor(
    public formbuilder: FormBuilder,
    private http:NodeapiService,
    private notification:NotificationService,
    private loaderservice: GloballoaderService
    ) { 
    this.getUserApi()
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
      role: new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void {
    
  }
  cancel1(){
    this.formopen=false;
    this.btndiv=true;
  }
  cancel2(){
    this.updateopen=false;
    this.btndiv=true;
  }
  adduser(){
    this.formopen = true
    this.btndiv=false
  }
  getUserApi() {
    this.http.getUser().subscribe(
      (response) => {
        this.getUserData = response;
      }
    )
  }
  getSubAdminApi() {
    this.http.getSubAdmin().subscribe(
      (response) => {
        this.getSubAdminData = response;
      }
    )
  }

  ////////////////(add users)//////////////////////
  addUser(nname, nemail, npassword, nrole) {
   
    if (nname.length === 0 || nemail.length === 0 || npassword.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
      this.createuserdata.reset()
    }
    else if(nrole === 'user') {
      this.formopen=false;
      this.btndiv=true;
      this.newUser = {
        name: nname,
        email: nemail,
        password: npassword,
        role: nrole
      }
      this.http.postUser(this.newUser).subscribe()
      this.createuserdata.reset()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getUserApi()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("User Data Added Successfully")
      }, 2000);

    }
    else{
      this.formopen=false;
      this.btndiv=true;
      this.newUser = {
        name: nname,
        email: nemail,
        password: npassword,
        role: nrole
      }
      this.http.postSubAdmin(this.newUser).subscribe()
      this.createuserdata.reset()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getSubAdminApi()
       
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("Sub-Admin is Added Successfully")
      }, 2000);
    }
  }

  /////////////(update user)/////////////////////
  editUser(index) {
    this.formopen = false;
    this.btndiv = false
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
    console.log(this.getupdateUser);
  }
  editsub(index) {
    this.formopen = false;
    this.btndiv = false
    this.updateopen = true;
    this.http.getSubAdminID(index).subscribe(
      (response) => {
        this.getupdatesub = response
        this.uid = index;
        this.uname = this.getupdatesub.name;
        this.uemail = this.getupdatesub.email;
        this.upassword = this.getupdatesub.password;
        this.urole = this.getupdatesub.role
      }
    )
    console.log(this.getupdatesub);
    
  }
  updateUser(unname, uneamil, unpass,unrole) {
    this.btndiv = true;
    this.updateopen = false;
    if (unname.length === 0 || uneamil.length === 0 || unpass.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
      this.createuserdata.reset()
    }
    else if(unrole === 'user') {
      this.newUser = {
        name: unname,
        email: uneamil,
        password: unpass,
        role: unrole
      }
      this.http.putUser(this.uid, this.newUser).subscribe()
      this.createuserdata.reset()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getUserApi()
       
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("User is Updated")
      }, 2000);
    }
    else{
      this.newUser = {
        name: unname,
        email: uneamil,
        password: unpass,
        role: unrole
      }
      this.http.putSubAdmin(this.uid, this.newUser).subscribe()
      this.createuserdata.reset()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getSubAdminApi()
        
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("Subadmin is Updated")
      }, 2000);
    }
  }

  /////////////(delete user)///////////////////
  delUser(id,role) {
    if(role === 'user'){
      this.http.deleteUser(id).subscribe(response => {
        this.data = response;
        this.data = this.data.filter(item => item.id !== id)
      })
      setTimeout(() => {
        this.notification.dataAddedSuccess('User is Deleted Successfully')
      }, 2000);
    }
    else{
      this.http.deleteSubAdmin(id).subscribe(response => {
        this.data = response;
        this.data = this.data.filter(item => item.id !== id)
      })
      setTimeout(() => {
        this.notification.dataAddedSuccess('Sub-Admin is Deleted Successfully')
      }, 2000);
    }
    this.loaderservice.show()
    setTimeout(() => {
      this.loaderservice.hide()
      this.getUserApi()
      this.getSubAdminApi()
    }, 2000);
   
  }
}
