import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  
})
export class NavbarComponent {
  constructor(private router: Router){}
  redirectToGmail(): void {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=admin@artiset.in', '_blank');
  }

  redirectToWhatsApp(): void {
    window.location.href = 'https://wa.me/918600735433';
  }

  onContact(){
    this.router.navigate(['/contact-page']);
  }
  onLogo(){
    this.router.navigate(['/landing-page']);
  }
}
