import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-create-plant',
  standalone: true,
  imports: [CommonModule, CardComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.scss'],
})
export class CreatePlantComponent {
  plantForm = new FormGroup({
    species: new FormControl(''),
  });

  private sending: boolean = false;

  constructor(private router: Router, private plantService: PlantService) {}

  create(): void {
    const species = this.plantForm.value.species;
    if (species && !this.sending) {
      this.sending = true
      this.plantService
        .createPlant({ species, plantDate: new Date() })
        .then((createdId: string) => this.router.navigate(['plants', createdId]))
        .catch(() => this.sending = false);
    }
  }
}
