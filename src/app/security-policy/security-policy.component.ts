import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-security-policy',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './security-policy.component.html',
  styleUrl: './security-policy.component.css'
})
export class SecurityPolicyComponent {

}
