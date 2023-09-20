import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GloballoaderService } from '../services/globalloader.service';

@Injectable()
export class GloballoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService:GloballoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
     setTimeout(() => {
      this.loaderService.hide()
     }, 2000);
     return next.handle(request);
  }
}
