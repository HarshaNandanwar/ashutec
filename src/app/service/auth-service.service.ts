import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {

  constructor( public router:Router) { 
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.loggedIn.set(true);
      this.userName.set(storedUser);
    }
  }
  private loggedIn = signal<boolean>(false);
  private userName = signal<string | null>(null);

  login(user: any) {
    if (user.trim()) {
      this.loggedIn.set(true);
      this.userName.set(user);
      console.log(this.userName());
      sessionStorage.setItem('user', user);
      return true;
    }
    return false;
  }


  isLoggedIn() {
    return this.loggedIn();
  }

  logout(){
    this.loggedIn.set(false);
    this.userName.set(null);
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login'); 
  }
getUsername(){
  return this.userName();
}
}
