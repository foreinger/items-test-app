import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[textAreaSubmit]',
  standalone: true
})
export class TextAreaSubmitDirective {

  constructor(
    private elRef: ElementRef<HTMLTextAreaElement>
  ) {
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterKey(event: KeyboardEvent): void {
    if (!event.shiftKey) {
      event.preventDefault();
      this.elRef.nativeElement?.closest('form')?.dispatchEvent(new Event('submit'));
      this.elRef.nativeElement?.dispatchEvent(new Event('submit'));
    }
  }
}
