import { Component, OnInit } from '@angular/core';
import { GloballoaderService } from 'src/app/services/globalloader.service';
import { NodeapiService } from 'src/app/services/nodeapi.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-subadminhome',
  templateUrl: './subadminhome.component.html',
  styleUrls: ['./subadminhome.component.scss']
})
export class SubadminhomeComponent implements OnInit {

  createopen: boolean = true;
  updateopen: boolean = false;
  getUserData: any;
  getTaskData: any;
  newTask: {};
  itask: string;
  iassign: string;
  iprogress: string;
  totalUser: any;
  getSubAdminData: any;
  totalsubadmin: any;
  totalTask: any;
  taskcom: any;
  constructor(
    private http: NodeapiService,
    private notification: NotificationService,
    private loaderService:GloballoaderService,
  ) {
    setTimeout(() => {
      this.getTaskApi();
      this.getUserApi();
    }, 2000);
  }

  ngOnInit(): void {
    this.loaderService.show()
    setTimeout(() => {
      this.loaderService.hide()
    }, 2000);

  }

  getUserApi() {
    this.http.getUser().subscribe((res) => {
      this.getUserData = res
      this.totalUser = this.getUserData.length

    })
  }

  getTaskApi() {
    this.taskcom = 0
    this.http.getTask().subscribe((res) => {
      this.getTaskData = res;
      this.totalTask = this.getTaskData.length
        for (let i = 0; i < this.getTaskData.length; i++) {
          if (this.getTaskData[i].progress === '100') {
            this.taskcom = this.taskcom + 1;
          }
        }
    })
  }

  addTask(ntask, nassignuser, nprogress) {
    if (ntask.length === 0 || nassignuser.length === 0 || nprogress.length === 0) {
      this.notification.openErrorBar("Please Fill the Details")
      this.itask = "";
      this.iassign = "";
      this.iprogress = ""
    }
    else {
      this.newTask = {
        task: ntask,
        subTask: '',
        assign: nassignuser,
        progress: nprogress
      }
      this.http.postTask(this.newTask).subscribe()
      
      this.loaderService.show()
      setTimeout(() => {
        this.loaderService.hide()
        this.getTaskApi()
        this.itask = "";
        this.iassign = "";
        this.iprogress = ""
      }, 2000);
      setTimeout(() => {
        this.notification.dataAddedSuccess("Task Created Successfully");
      }, 2000);
    }
  }


}
