import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class CardComponent {
  @HostBinding('class') cssClasses = 'rounded p-4 bg-primary dark:bg-primary';
}
