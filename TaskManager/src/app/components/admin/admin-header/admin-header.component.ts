import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  admin: string;

  constructor(private router:Router) { 
    this.admin = localStorage.getItem('admin')
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.setItem('admin','')
    this.router.navigate(['../'])
  }

}
