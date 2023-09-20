import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GloballoaderService } from 'src/app/services/globalloader.service';

@Component({
  selector: 'app-subadminheader',
  templateUrl: './subadminheader.component.html',
  styleUrls: ['./subadminheader.component.scss']
})
export class SubadminheaderComponent implements OnInit {
  subadmin: string;

  constructor(private router:Router) {
    this.subadmin = localStorage.getItem('subadmin')
   }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.setItem('subadmin','');
    this.router.navigate(['../'])
  }

}
