import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationService } from "../auth/registration.service";
import { Router } from '@angular/router';


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

  constructor(private reg:RegistrationService, private router: Router) { }

  registration(firstname:string, lastname:string, email:string, password:string) {
    console.log();
    let success = this.reg.registration(firstname, lastname, email, password);
    success.subscribe( data => {
      if (data) {
        this.router.navigate(['/sign-in']);
      } 
    })
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
