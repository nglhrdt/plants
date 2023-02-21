import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @HostBinding('class') cssClasses = 'min-h-full';

  constructor(private auth: Auth, private router: Router) {}

  login(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(() => this.router.navigate(['']));
  }
}
