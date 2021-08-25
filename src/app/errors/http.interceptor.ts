import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpEventType, HttpErrorResponse}   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService) {
  }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let lastResponse: HttpEvent<any>;
    let error: HttpErrorResponse;

    return next.handle(request)
    .pipe(
      tap((response: HttpEvent<any>) => {
        lastResponse = response;
        if (response.type === HttpEventType.Response) {
            console.log('succes');
        }
      }),
      catchError((err: any) => {
        error = err;
        console.log('error response', err);
        if (err instanceof HttpErrorResponse) {
              try {
                if (err.status == 0) {
                  this.toasterService.error('Incorrect username or password',  'Exception', {positionClass: 'toast-top-right'});
                }
              } catch (e) {
                this.toasterService.error(err.error.message, 'Exception', {positionClass: 'toast-top-right'});
              }
            }
        return throwError(err);
      }));
  }
}
