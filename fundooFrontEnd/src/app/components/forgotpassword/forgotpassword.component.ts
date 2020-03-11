import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  passwordMessage = new FormControl('', [Validators.required, Validators.email]);
  

  


  forgotPasswordErrorMessage() {
    return this.passwordMessage.hasError('required') ? 'You must enter a value' :
           this.passwordMessage.hasError('email') ? 'Not a valid password' :'';
  }
}
