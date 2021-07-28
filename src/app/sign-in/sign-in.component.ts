import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from "../auth/authorization.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  return: string = '';

  constructor(private auth:AuthorizationService, private router: Router, private route: ActivatedRoute) { }

  authentification(email:string, password:string) {
    let res = this.auth.generateToken(email, password);
    res.subscribe(data => {
      console.log(data);
      if(data) {
        this.router.navigateByUrl(this.return);
      } else {
        this.error = "Incorrect email or password"
      }
    });
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: any;

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/main');
  }

}
