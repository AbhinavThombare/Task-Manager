import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { NodeapiService } from './nodeapi.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  valid: boolean=false;

  constructor(private http:NodeapiService) { }
  
  loggedIn(){
    this.isLoggedIn
    this.valid = true
  }

  get isLoggedIn(){
   if(this.valid){
    return true
   }
   else{
    return false
   }
    
  }
}
