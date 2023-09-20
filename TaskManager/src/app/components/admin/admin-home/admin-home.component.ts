import { tokenName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  taskData: any;
  getUserData: any;
  newtask: {};
  getupdate: any;
  utask: any;
  uassign: any = "Select User";
  uprogress: any;
  uid: any;
  createopen: boolean = true;
  updateopen: boolean = false;
  oldsubopen: boolean = false;
  subopen: boolean = false;
  data: any;
  itask: string;
  iassign: string;
  iprogress: string;
  totalTask: any;
  totalUser: any;
  taskcom: number = 0;
  getSubAdminData: any;
  totalsubadmin: any;
  taskname: any;
  subtaskName: any;
  user: any;
  nameSearch :any;
  constructor(
    private http: NodeapiService,
    private notification: NotificationService,
    private loaderService: GloballoaderService
  ) {


  }

  ngOnInit(): void {
   
    this.loaderService.show()
    setTimeout(() => {
      this.getTasksApi();
      this.getUserApi();
      this.getSubAdminApi();
      this.loaderService.hide()
    }, 2000);

  }

  subtaskArray = new FormArray([new FormControl('', Validators.required)]);
  oldsubtaskArray = new FormArray([]);

  cancel() {
    this.createopen = true;
    this.updateopen = false;
  }
  canceloldtask(){
    this.createopen = true;
    this.oldsubopen = false;
    this.updateopen = false;
    this.subopen = false
  }
  

  getTasksApi() {
    this.taskcom = 0
    this.http.getTask().subscribe(
      (response) => {
        this.taskData = response;
        this.totalTask = this.taskData.length
        for (let i = 0; i < this.taskData.length; i++) {
          if (this.taskData[i].progress === '100') {
            this.taskcom = this.taskcom + 1;
          }
        }
      }
    )
  }
  getUserApi() {
    this.http.getUser().subscribe(
      (response) => {
        this.getUserData = response;
        this.totalUser = this.getUserData.length

      }
    )
  }
  getSubAdminApi() {
    this.http.getSubAdmin().subscribe(
      (response) => {
        this.getSubAdminData = response;
        this.totalsubadmin = this.getSubAdminData.length

      }
    )
  }
  addData(ntask: any, nuser: any, nprogress: any) {
    if (ntask.length === 0 || nuser.length === 0 || nprogress.length === 0) {
      this.notification.openErrorBar('Please Fill the Details')
    }
    else {
      this.newtask = {
        task: ntask,
        subTask: '',
        assign: nuser,
        progress: nprogress
      }
      this.http.postTask(this.newtask).subscribe()
      this.loaderService.show()
      setTimeout(() => {
        this.loaderService.hide()
        this.getTasksApi()
        this.itask = "";
        this.iassign = "";
        this.iprogress = "";
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("Task Added Successfully")
      }, 2000);

    }
  }

  editTask(index) {
    this.createopen = false;
    this.updateopen = true;
    this.oldsubopen = false
    this.subopen = false
    this.http.getTaskindex(index).subscribe(
      (response) => {
        this.getupdate = response
        this.uid = index;
        this.utask = this.getupdate.task;
        this.uassign = this.getupdate.assign;
        this.uprogress = this.getupdate.progress;
      }
    )
  }

  updateTask(unewtask, unewassign, unewprogress) {

    if (unewtask.length === 0 || unewassign.length === 0 || unewprogress.length === 0) {
      this.notification.openErrorBar('Please Fill the Details')
    }
    else {
      this.createopen = true;
      this.updateopen = false;
      this.newtask = {
        task: unewtask,
        assign: unewassign,
        progress: unewprogress
      }

      this.http.postUpdateTask(this.uid, this.newtask).subscribe()
      this.loaderService.show()
      setTimeout(() => {
        this.loaderService.hide()
        this.getTasksApi()
        this.utask = "";
        this.uprogress = "";
        this.uassign = "";
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Data is Updated')
      }, 2000);

    }
  }

  delTask(id) {
    this.http.deleteTask(id).subscribe(response => {
      this.data = response;
      this.data = this.data.filter(item => item.id !== id)
    })
    this.loaderService.show()
    setTimeout(() => {
      this.loaderService.hide()
      this.getTasksApi()
    }, 2000);
    setTimeout(() => {
      this.notification.dataAddedSuccess("Task is Deleted Successfully")
    }, 2000);
  }

  ////////////////////////{add add/remove Sub Task}////////////////////////////

  addInputControl() {
    this.subtaskArray.push(new FormControl('', Validators.required));
  }
  removeInputControl(idx: number) {
    this.subtaskArray.removeAt(idx);
  }


    ////////////////////////{Edit add/remove Sub Task}////////////////////////////

    oldaddInputControl() {
      this.oldsubtaskArray.push(new FormControl('', Validators.required));
    }
    oldremoveInputControl(idx: number) {
      this.oldsubtaskArray.removeAt(idx);
    }
  ////////////////////////{add Sub Task}////////////////////////////

  openTask(user,tname) {
    this.subopen = true
    this.createopen = false
    this.updateopen = false
    this.oldsubopen = false
    this.taskname = tname
    this.user = user
    
    this.http.getTaskName(this.user, this.taskname).subscribe(
      (response) => {
        console.log(response);
        
        this.getupdate = response
        this.utask = this.getupdate[0].task;
      }
    )
  }

  addSubTask(tname) {
    if (tname.length === 0 || this.subtaskArray.value[0] === '') {
      this.notification.openErrorBar("Please Add the Sub-Task")
    }
    else {
      this.subopen = false
      this.createopen = true
      this.taskname = tname
      this.subtaskName = this.subtaskArray.value

      this.http.postSubTask(this.user, this.taskname, this.subtaskName).subscribe()

      this.loaderService.show()
      setTimeout(() => {
        this.loaderService.hide()
        this.getTasksApi()
        this.subtaskArray.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Sub Task is Added')
      }, 2000);
    }
  }


   ////////////////////////{Edit Sub Task}////////////////////////////

   editsubTask(tname, subTasks, auser) {
    this.oldsubtaskArray.clear()
    this.createopen = false;
    this.updateopen = false;
    this.oldsubopen = true;
    this.subopen = false;
    this.user = auser;
    for(let i = 0; i<subTasks.length;i++){
      this.oldsubtaskArray.push(new FormControl(subTasks[i], Validators.required))
    }
    this.utask = tname;
  }

  addUpdatedSubTask(tname) {
    if (this.oldsubtaskArray.value[0] === '') {
      this.notification.openErrorBar("Please Add the Sub-Task")
    }
    else {
      this.createopen = true
      this.oldsubopen = false
      this.taskname = tname
      this.subtaskName = this.oldsubtaskArray.value
      
      this.http.putSubTask(this.user, this.taskname, this.subtaskName).subscribe()

      this.loaderService.show()
      setTimeout(() => {
        this.loaderService.hide()
        this.getTasksApi()
        this.oldsubtaskArray.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Sub Task is Added')
      }, 2000);
    }
  }


}
