import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginServer } from './login-server';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginServer,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
