import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthorizationService } from "../auth/authorization.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth:AuthorizationService) { }

  registration(firstname:string, lastname:string, email:string, password:string) {
    let request = {
      "firstname":firstname,
      "lastname":lastname,
      "email":email,
      "password":password
    };
    console.log(request);

    //this.auth.registration(request);
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  @Input() error: any;

  @Output() submitEM = new EventEmitter();

  ngOnInit(): void {
  }

}
