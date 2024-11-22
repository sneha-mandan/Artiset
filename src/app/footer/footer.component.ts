import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private router: Router) {}

  onDisclaimer() {
    this.router.navigate(['/disclaimer']);
  }

  onSecurityPolicy() {
    this.router.navigate(['/security-policy']);
  }

  onPrivacy() {
    this.router.navigate(['/privacy']);
  }

  onFAQ() {
    this.router.navigate(['/faq']);
  }
}
