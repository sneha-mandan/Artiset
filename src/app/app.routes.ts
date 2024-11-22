import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { privacyComponent } from './privacy/privacy.component';
import { SecurityPolicyComponent } from './security-policy/security-policy.component';

export const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  {path: 'contact-page', component: ContactPageComponent},
  {path: 'footer', component:FooterComponent},
  {path: 'navbar', component:NavbarComponent},
  {path: 'privacy', component: privacyComponent},
  {path: 'security-policy', component:SecurityPolicyComponent}
];
