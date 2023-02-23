import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { Plant, PlantService } from 'src/app/services/plant.service';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './plant-details.component.html',
})
export class PlantDetailsComponent {
  plant$: Observable<Plant>;

  constructor(route: ActivatedRoute, private service: PlantService, private router: Router) {
    this.plant$ = route.params.pipe(
      map((params) => params['id']),
      mergeMap((plantId) => service.getPlantById$(plantId))
    );
  }

  delete(plant: Plant): void {
    this.service.deletePlant(plant).then(() => this.router.navigate(['/plants']));
  }
}
