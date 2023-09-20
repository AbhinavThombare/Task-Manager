import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GloballoaderService } from 'src/app/services/globalloader.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.scss']
})
export class UserheaderComponent implements OnInit {
  user: string;

  constructor(private router:Router) { 
    this.user = localStorage.getItem('user')
  }

  ngOnInit(): void {
   
  }
  logout(){
    localStorage.setItem('user','')
    this.router.navigate(['../'])
    
  }
}
