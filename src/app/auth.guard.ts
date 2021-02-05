import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
if(localStorage.getItem('user')!==null){
  localStorage.removeItem('user')
return true
    }else{
this.router.navigate(['login'])
    }
  }
  
}
