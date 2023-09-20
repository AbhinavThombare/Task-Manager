import { Component, OnInit } from '@angular/core';
import { NodeapiService } from 'src/app/services/nodeapi.service';

@Component({
  selector: 'app-subadim-show-user',
  templateUrl: './subadim-show-user.component.html',
  styleUrls: ['./subadim-show-user.component.scss']
})
export class SubadimShowUserComponent implements OnInit {
  getUserData: Object;

  constructor(private http:NodeapiService) { 
    this.getUserApi();
  }

  ngOnInit(): void {
  }

  getUserApi(){
    this.http.getUser().subscribe((res) => {
      this.getUserData = res;
    })
  }


}
