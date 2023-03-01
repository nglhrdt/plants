import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogoutComponent, ButtonComponent, RouterLink],
  templateUrl: './plants.component.html',
})
export class PlantsComponent {}
