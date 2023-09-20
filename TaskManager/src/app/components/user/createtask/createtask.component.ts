import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.scss']
})
export class CreatetaskComponent implements OnInit {
  getTaskData: any;
  subTask: FormGroup;
  count: number = 0;
  sdata: any;
  createopen: boolean = true;
  subopen: boolean = false;
  oldsubopen: boolean = false;


  message_error = {
    'data': [
      { type: 'required', message: 'Input is required' }
    ]
  }
  uid: any;
  uassign: any;
  uprogress: any;
  utask: any;
  getupdate: any;
  user: string;
  newData: { task: any; subTask: any; progress: any; assign: any; };
  iassign: string;
  itask: string;
  iprogress: any;
  taskname: any;


  subtaskArray = new FormArray([new FormControl('', Validators.required)]);
  oldsubtaskArray = new FormArray([]);
  subtaskName: any;
  usubtask: any;

  constructor(
    private http: NodeapiService,
    private formbuilder: FormBuilder,
    private notification: NotificationService,
    private loaderservice: GloballoaderService,
  ) {
    this.user = localStorage.getItem('user')
    this.subTask = this.formbuilder.group({
      data: new FormControl('', Validators.compose([
        Validators.required
      ])),
      subtasks: new FormArray([])
    })
    this.getTaskApi();
  }

  ngOnInit(): void {

  }
  cancel() {
    this.createopen = true;
    this.subopen = false;
    this.oldsubopen = false;
  }

  canceloldtask() {
    this.createopen = true;
    this.subopen = false;
    this.oldsubopen = false;
  }

  get field() { return this.subTask.controls; }
  get subtask() { return this.field.subtasks as FormArray; }
  get data() { return this.subTask.get('data'); }


  getTaskApi() {
    this.http.getTaskData(this.user).subscribe((res) => {
      this.getTaskData = res
      this.iassign = this.user
    })
  }

  ////////////////////////{add progressTask}////////////////////////////

  addTask(tname, tassign, tprogres) {
    if (tname.length === 0 || tassign.length === 0 || tprogres.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
      this.itask = '';
      this.iprogress = ''
    }
    else {
      this.newData = {
        task: tname,
        assign: tassign,
        subTask: '',
        progress: tprogres,
      }
      this.http.postTask(this.newData).subscribe()
      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getTaskApi()
        this.itask = '';
        this.iprogress = ''
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Task is Created')
      }, 2000);
    }
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

  openTask(tname) {
    this.subopen = true
    this.createopen = false
    this.oldsubopen = false
    this.taskname = tname
    
    this.http.getTaskName(this.user, this.taskname).subscribe(
      (response) => {
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

      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getTaskApi()
        this.subtaskArray.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Sub Task is Added')
      }, 2000);
    }
  }

  ////////////////////////{Edit Sub Task}////////////////////////////

  editTask(tname, subTasks) {
    this.oldsubtaskArray.clear()
    this.subopen = false
    this.createopen = false
    this.oldsubopen = true
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
      this.subopen = false
      this.createopen = true
      this.oldsubopen = false
      this.taskname = tname
      this.subtaskName = this.oldsubtaskArray.value
      
      this.http.putSubTask(this.user, this.taskname, this.subtaskName).subscribe()

      this.loaderservice.show()
      setTimeout(() => {
        this.loaderservice.hide()
        this.getTaskApi()
        this.oldsubtaskArray.reset()
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Sub Task is Added')
      }, 2000);
    }
  }


}
