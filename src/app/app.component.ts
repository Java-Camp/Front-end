import { Component } from '@angular/core';
import { AuthorizationService } from "./auth/authorization.service";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
  isActive = false;

  constructor(private auth:AuthorizationService, private router: Router) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        let activeUrl = event['url'];
        console.log(activeUrl);
        if (activeUrl.includes('/sign-in') || activeUrl.includes('/sign-up')) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      }
    });
  }


}
