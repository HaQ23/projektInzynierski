import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

/**
 * BaseComponent is a class that automatically unsubscribes from observables
 * when the component is destroyed.
 *
 * Use case example:
 * @example
 * export class ChildComponent extends BaseComponent implements OnInit {
 *   ngOnInit(): void {
 *   // Emit a value every second until the component is destroyed
 *     interval(1000)
 *       .pipe(this.takeUntilDestroyed())
 *       .subscribe((x) => console.log(x));
 *   }
 * }
 */
@Directive()
export abstract class BaseComponent implements OnDestroy {
  loading: boolean = false;
  private _destroy$?: Subject<void>;

  protected takeUntilDestroyed = <T>() => {
    if (!this._destroy$) {
      this._destroy$ = new Subject<void>();
    }
    return takeUntil<T>(this._destroy$);
  };

  protected asyncRequest<T extends any>(request: Observable<T>): Observable<T> {
    this.loading = true;
    return request.pipe(
      this.takeUntilDestroyed(),
      finalize(() => (this.loading = false))
    );
  }

  protected async<T extends any>(request: Observable<T>): Observable<T> {
    return request.pipe(this.takeUntilDestroyed());
  }

  ngOnDestroy() {
    if (this._destroy$) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }
}
