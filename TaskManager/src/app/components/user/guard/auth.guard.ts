import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouterState, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from 'src/app/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authser:AuthService,private router:Router){
    
  }
  canActivate(){
    if(this.authser.isLoggedIn){ 
      return true
    }
    else{
      this.router.navigate(['../'])
      return false;
    }
  }
  
}


