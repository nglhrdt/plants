import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
