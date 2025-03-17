import { Component } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthServiceService]
})
export class LoginComponent {
  username = '';

  constructor(public authService: AuthServiceService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); 
    }
   }

  login() {
    if (this.authService.login(this.username)) {
      this.router.navigate(['/dashboard']); 
    } else {
      console.log('Login failed');
    }
  }
}
