import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private tokenValid: boolean = true

  constructor(private authService: AuthService, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token')
      if(token){
        this.authService.verifyToken(token).subscribe(
        ()=>{
        this.tokenValid = true
        },
        ()=> { this.userService.logout().subscribe(), localStorage.removeItem('token'), localStorage.removeItem('userLoggedIn'), location.assign('/login')
        alert('Tu sesión ha expirado o tu token es inválido.');
        this.tokenValid = false
        })
      }
      return this.tokenValid
  }
}
