import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {
  taskData: any;
  user: string;
  itask: string;
  iprogress: number;
  subscription: any;
  messageForStudent: string;
  getTaskData: any;
  uid: any;
  utask: any;
  uassign: any;
  uprogress: any;
  open: boolean = false
  newData: { task: any; progress: any; };
  newTask: any;


  isLoading: Subject<boolean> = this.loaderService.isLoading;
  isLoaded: any = this.isLoading
  // @Input() user: string;
  constructor(
    private http: NodeapiService,
    private notification: NotificationService,
    private loaderService: GloballoaderService,
  ) {
    this.loaderService.show()
    setTimeout(() => {
      this.loaderService.hide()
      this.getTaskDataApi()
    }, 2000);

  }

  ngOnInit(): void {
    this.loaderService.show()
    setTimeout(() => {
      this.loaderService.hide()
    }, 2000);

  }

  cancel() {
    this.open = false
  }
  getTaskDataApi() {
    this.user = localStorage.getItem('user')
    this.http.getTaskData(this.user).subscribe((res) => {
      this.taskData = res
    })

  }

  editProgress(tname) {
    this.open = true
    this.newTask = tname
    this.http.getTaskName(this.user, this.newTask).subscribe(
      (response) => {

        this.getTaskData = response
        this.utask = this.getTaskData[0].task;
        this.uassign = this.user
        this.uprogress = this.getTaskData[0].progress;
      }
    )

  }

  addProgress(tname, tpro) {
    if (tname.length === 0 || tpro.length === 0) {
      this.notification.openErrorBar("Please Add Progress")
      this.uprogress = ''
    }
    else {
      this.newData = {
        task: tname,
        progress: tpro
      }
      this.http.postProgress(this.user, this.newTask, this.newData).subscribe()
      this.loaderService.show()
      setTimeout(() => {
        this.loaderService.hide()
        this.getTaskDataApi()
        this.uassign = ''
        this.utask = ''
        this.uprogress = ''
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess('Progress is Added Successfully')
      }, 2000);
    }


  }

}
