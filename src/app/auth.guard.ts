import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,public fs: FirebaseService,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("state.url : " + state.url);
    this.fs.checkLog(); // to do : necessary ?

      if(this.fs.signedInBoolean){
        return true
      } else {
      //Obligation to use "skipLocationChange : true" otherwise the router doesn't navigate
      this.router.navigate(['/accessdenied'], {skipLocationChange: true});
      return false
      }

    }
  
}
