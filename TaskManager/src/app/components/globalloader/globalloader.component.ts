import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GloballoaderService } from 'src/app/services/globalloader.service';


@Component({
  selector: 'app-globalloader',
  templateUrl: './globalloader.component.html',
  styleUrls: ['./globalloader.component.scss']
})
export class GloballoaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService:GloballoaderService) { 
  }

  ngOnInit(): void {
  }

}
