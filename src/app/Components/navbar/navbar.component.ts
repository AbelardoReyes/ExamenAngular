import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  userLoggedIn: boolean = false;

  ngOnInit() {
    this.getToken();
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (userLoggedIn !== null) {
      this.userLoggedIn = userLoggedIn === 'true';
    }

    this.userService.getUserLoggedIn().subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
      localStorage.setItem('userLoggedIn', this.userLoggedIn.toString());
    });
  }

  getToken() {
    this.userService.getToken().pipe(
      map(token => {
        if(token) {
          this.userLoggedIn = true;
          localStorage.setItem('userLoggedIn', this.userLoggedIn.toString());
        } else {
          this.userLoggedIn = false;
        }
      }
    )).subscribe(response => console.log(response));
  }
    
  logout() {
    this.userService.logout().subscribe(() => location.reload());
    localStorage.removeItem('token');
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/registro']);
  } 
}

