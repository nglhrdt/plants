import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { PlantListComponent } from '../plant-list/plant-list.component';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogoutComponent, PlantListComponent],
  templateUrl: './plants.component.html',
})
export class PlantsComponent {}
