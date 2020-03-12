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
  
  emailMessage = new FormControl('', [Validators.required, Validators.email]);
  
  emailErrorMessage() {
    return this.emailMessage.hasError('required') ? 'You must enter an Email' :
           this.emailMessage.hasError('email') ? 'Not a valid email' :'';
  }

}
