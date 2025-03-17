import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../service/highlight.directive';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HighlightDirective,HttpClientModule,UpperCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers:[AuthServiceService]
})
export class DashboardComponent {
  users = signal<any[]>([]);
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = 5;
  username: string ;

  constructor(private http: HttpClient,public authService: AuthServiceService, private router: Router) {
    if(sessionStorage.getItem('user')!=null ){
    history.pushState(null, '', location.href); 
    window.onpopstate = () => {
      history.pushState(null, '', location.href); 
    };}

    this.username = this.authService.getUsername()?? 'Guest';
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
    .subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => console.error("API Error:", err)
    });
  }

  get filteredUsers() {
    return this.users().filter(user => 
      JSON.stringify(user).toLowerCase().includes(this.searchQuery().toLowerCase())
    );
  }

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  });
}
