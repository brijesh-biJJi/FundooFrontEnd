import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  emailMessage = new FormControl('', [Validators.required, Validators.email]);
  passwordMessage = new FormControl('', [Validators.required, Validators.email]);
  

  

  emailErrorMessage() {
    return this.emailMessage.hasError('required') ? 'You must enter a value' :
           this.emailMessage.hasError('email') ? 'Not a valid email' :'';
  }
  passwordErrorMessage() {
    return this.passwordMessage.hasError('required') ? 'You must enter a value' :
           this.passwordMessage.hasError('email') ? 'Not a valid password' :'';
  }
}
