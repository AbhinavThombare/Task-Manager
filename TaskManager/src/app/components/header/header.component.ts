import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  open: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  // close(){
  //   this.open=!this.open;
  // }

}
