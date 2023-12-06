import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[textareaAutosize]',
  standalone: true
})
export class TextareaAutosizeDirective {

  @HostListener('input', ['$event.target'])
  public onInput(textArea: HTMLTextAreaElement): void {
    this.adjustHeight(textArea);
  }

  @HostListener('submit', ['$event.target'])
  public onChange(textArea: HTMLTextAreaElement): void {
    this.resetHeight(textArea)
  }

  private resetHeight(textArea: HTMLTextAreaElement): void {
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
  }

  private adjustHeight(textArea: HTMLTextAreaElement): void {
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
