// import { Component } from '@angular/core';
// import { NavbarComponent } from "../navbar/navbar.component";
// import { FooterComponent } from "../footer/footer.component";
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-contact-page',
//   standalone: true,
//   imports: [NavbarComponent, FooterComponent],
//   templateUrl: './contact-page.component.html',
//   styleUrl: './contact-page.component.css'
// })
// export class ContactPageComponent {
//   constructor(private router: Router){}
//   redirectToGmail(): void {
//     window.open('https://mail.google.com/mail/?view=cm&fs=1&to=admin@artiset.in', '_blank');
//   }
//   redirectToWhatsApp(): void {
//     window.location.href = 'https://wa.me/918600735433';
//   }
//   redirectToCall(): void {
//     window.location.href = 'tel:+918600735433';
// }
// }


/*-------------------------above code is without google recaptcha---------------------------------*/



/*-------------------------below code is with google recaptcha---------------------------------*/

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements AfterViewInit {
  formData = {
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    message: ''
  };

  public reCaptchaSiteKey: string = '6LeScn4qAAAAAEz9B-IXAA3xlPU4GRiX7YcgXmqr'; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.reCaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => console.log('reCAPTCHA script loaded successfully.');
      script.onerror = () => console.error('Failed to load reCAPTCHA script.');
      document.head.appendChild(script);
    }
  }

  onSubmit() {
    if (!this.validateForm()) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isPlatformBrowser(this.platformId) && typeof (window as any).grecaptcha !== 'undefined') {
      console.log('Executing reCAPTCHA...');
      (window as any).grecaptcha.execute(this.reCaptchaSiteKey, { action: 'submit' }).then((token: string) => {
        if (!token) {
          alert('CAPTCHA validation failed. Please try again.');
          return;
        }

        console.log('CAPTCHA token generated:', token);

        const formDataWithCaptcha = { ...this.formData, captchaToken: token };

        this.http.post('http://localhost:3000/submit-form', formDataWithCaptcha).subscribe({
          next: (response: any) => {
            console.log('Form submitted successfully:', response);
            alert('Form submitted successfully! Thank you for contacting us. We will get back to you shortly. ');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
          },
        });
      }).catch((error: any) => {
        console.error('Error executing reCAPTCHA:', error);
        alert('Error verifying CAPTCHA. Please try again.');
      });
    } else {
      console.error('reCAPTCHA is not available.');
      alert('reCAPTCHA is not available. Please reload the page.');
    }
  }

  validateForm(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.jobTitle.trim() !== '' &&
      this.formData.message.trim() !== ''
    );
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      jobTitle: '',
      message: ''
    };
    console.log('Form reset successfully.');
  }

  redirectToGmail(): void {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=admin@artiset.in', '_blank');
  }

  redirectToWhatsApp(): void {
    window.location.href = 'https://wa.me/918600735433';
  }

  redirectToCall(): void {
    window.location.href = 'tel:+918600735433';
  }
}
