import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant, PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plant-list.component.html',
})
export class PlantListComponent {
  plants$: Observable<Plant[]>;

  constructor(plantService: PlantService) {
    this.plants$ = plantService.getPlants$();
  }
}
