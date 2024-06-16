import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: UsersService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }
}
