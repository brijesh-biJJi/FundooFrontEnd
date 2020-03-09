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
  
  emailErrorMsg = new FormControl('', [Validators.required, Validators.email]);
  

  

  getErrorMessage() {
    return this.emailErrorMsg.hasError('required') ? 'You must enter a value' :
           this.emailErrorMsg.hasError('email') ? 'Not a valid email' :'';
  }
}
