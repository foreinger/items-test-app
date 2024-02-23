import { DestroyRef, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { filter, fromEvent, map, merge, Observable, pairwise } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { AnimationBuilder } from '@angular/animations';
import { UtilsService } from '../../../core/services/utils.service';

@Directive({
  selector: '[scrollHandler]',
  standalone: true,
})
export class ScrollHandlerDirective implements OnInit {
  @Input() public animationsDisabled: boolean | undefined;
  @Input() public scrollButton: MatButton | undefined;

  private readonly scrollThreshold = 80;

  constructor(
    private elRef: ElementRef<HTMLDivElement>,
    private animationBuilder: AnimationBuilder,
    private destroyRef: DestroyRef,
  ) {}

  private get shouldScroll(): boolean {
    // get last message
    const lastMsg = this.elRef?.nativeElement.querySelector('.date-wrapper:last-of-type .message-wrapper:last-of-type');

    if (!this.elRef.nativeElement) return false;
    if (!lastMsg) return false;

    // extract room viewport sizes
    const { clientHeight, scrollHeight, scrollTop } = this.elRef.nativeElement;

    // calculate scroll position
    const position = Math.round(scrollHeight - scrollTop - clientHeight);

    // if after rendering the last message
    // scroll position is shifted less than by one message with threshold
    // allow auto scrolling otherwise not
    return position <= lastMsg.clientHeight + this.scrollThreshold;
  }

  public ngOnInit(): void {
    this.trackScrollButton();
    this.trackChatMutation();
    this.trackChatScroll();
    this.trackScrollAreaResize();
  }

  private trackChatMutation(): void {
    this.onChatMutation$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.animationsDisabled) {
          return this.elRef.nativeElement.scrollTo({
            top: this.elRef?.nativeElement?.scrollHeight,
            behavior: 'instant',
          });
        }
        if (this.shouldScroll) {
          return this.elRef.nativeElement.scrollTo({
            top: this.elRef?.nativeElement?.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  }

  private onChatMutation$(): Observable<any> {
    return new Observable<any>((subscriber) => {
      const mutationObserver = new MutationObserver((mutations) => {
        subscriber.next(mutations.filter((mutation) => mutation.addedNodes.length));
      });

      mutationObserver.observe(this.elRef.nativeElement, { childList: true });

      return async function unsubscribe(): Promise<void> {
        mutationObserver.disconnect();
      };
    });
  }

  private trackChatScroll(): void {
    const wheel$ = fromEvent(this.elRef.nativeElement, 'wheel').pipe(map((ev) => ev?.type));
    const scroll$ = fromEvent(this.elRef.nativeElement, 'scroll').pipe(map((ev) => ev?.type));

    merge(wheel$, scroll$)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        pairwise(),
        filter(([prev, curr]) => prev !== curr), // Ensure both events are present
      )
      .subscribe(() => {
        const container = this.elRef?.nativeElement as HTMLDivElement;
        const position = container.scrollHeight - Math.round(container?.scrollTop) - container.clientHeight;
        const btn = container.parentElement?.querySelector('.scroll-to-latest');

        if (position < this.scrollThreshold) {
          btn?.classList.add('hidden');
        } else {
          btn?.classList.remove('hidden');
        }

        // over wright last event by 'scroll' to avoid undesirable button appear
        this.elRef.nativeElement.dispatchEvent(new Event('scroll'));
      });
  }

  private trackScrollButton(): void {
    fromEvent(this.scrollButton?._elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ev) => {
        this.elRef.nativeElement.scroll({ top: this.elRef.nativeElement?.scrollHeight, behavior: 'smooth' });
        this.scrollButton?._elementRef.nativeElement.classList.add('hidden');
      });
  }

  private trackScrollAreaResize() {
    UtilsService.fromResizeObserver(this.elRef.nativeElement)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(pairwise())
      .subscribe(([prev, curr]) => {
        const difference = Math.abs(prev.height - curr.height);
        if (difference > 0) {
          this.elRef.nativeElement.scrollBy({ top: difference, behavior: 'smooth' });
        }
      });
  }
}
