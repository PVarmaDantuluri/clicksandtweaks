import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appFadeInOnScroll]',
  standalone: true,
})
export class FadeInOnScrollDirective implements AfterViewInit {
  @Input('appFadeInOnScroll') threshold: number = 0.5;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      requestAnimationFrame(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(this.el.nativeElement, 'visible');
              observer.unobserve(this.el.nativeElement);
            }
          },
          { threshold: this.threshold }
        );

        observer.observe(this.el.nativeElement);
      });
    }, 0);
  }
}
