import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from "../auth/authorization.service";
import { Router, ActivatedRoute } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  return: string = '';

  constructor(private auth:AuthorizationService, private router: Router,
              private route: ActivatedRoute,
              private toastrService: ToastrService){ }

  authentification(email:string, password:string) {
    let res = this.auth.generateToken(email, password);
    res.subscribe(data => {
      if(data) {
        this.router.navigateByUrl(this.return);
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
      .subscribe(params => this.return = params['return'] || '/accounts');
    this.toastrService.success('HelloWorld', 'Toaster is fun')

  }

}
