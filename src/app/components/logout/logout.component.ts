import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `<app-button (click)="logout()">Logout</app-button>`,
})
export class LogoutComponent {
  constructor(private auth: Auth, private router: Router) {}

  async logout(): Promise<void> {
    this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}
