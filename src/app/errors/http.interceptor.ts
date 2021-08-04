import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success)
            this.toasterService.success('Succesfuly', 'Code: ' + evt.body.success.code, {positionClass: 'toast-top-right'});
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            console.log(err);
            this.toasterService.error(err.error.message, 'Error', {positionClass: 'toast-top-right'});
          } catch (e) {
            this.toasterService.error('An error occurred',  err.error.status, {positionClass: 'toast-top-right'});
          }

        }
        return of(err);
      }));
  }
}
