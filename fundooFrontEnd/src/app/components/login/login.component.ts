import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit():void {}
  
  emailMessage = new FormControl('', [Validators.required, Validators.email]);
  passwordMessage = new FormControl('', [Validators.required,Validators.minLength(4)]);
  

  

  emailErrorMessage() {
    return this.emailMessage.hasError('required') ? 'You must enter an Email' :
           this.emailMessage.hasError('email') ? 'Not a valid email' :'';
  }
  passwordErrorMessage() {
    return this.passwordMessage.hasError('required') ? 'You must enter a Password' :
           this.passwordMessage.hasError('email') ? 'Not a valid password' :'';
  }
}

