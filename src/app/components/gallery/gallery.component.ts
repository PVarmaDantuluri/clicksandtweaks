import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInOnScrollDirective } from '../../directives/fade-in-on-scroll.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FadeInOnScrollDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  images: string[] = Array.from({ length: 50 }, (_, i) => `image${1}.jpg`);
}
