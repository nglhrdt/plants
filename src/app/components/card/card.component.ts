import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class CardComponent {
  @HostBinding('class') cssClasses = 'block rounded p-4 bg-primary dark:bg-primary';
}
