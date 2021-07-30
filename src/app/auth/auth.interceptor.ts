import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthorizationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isLoggedIn()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getJwtToken()}`
        }
      })
    }
    return next.handle(req);

  }

}
