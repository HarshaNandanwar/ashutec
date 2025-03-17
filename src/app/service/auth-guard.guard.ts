import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthServiceService } from "./auth-service.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) { }

  canActivate(): boolean {
    console.log('AuthGuard: Checking authentication',this.authService.isLoggedIn());

    if (this.authService.isLoggedIn()) {
      console.log('AuthGuard: Access granted');
      return true;
    } else {
      console.log('AuthGuard: Not logged in, redirecting to login');
      this.router.navigate(['/login']); 
      return false;
    }
  

  }
}