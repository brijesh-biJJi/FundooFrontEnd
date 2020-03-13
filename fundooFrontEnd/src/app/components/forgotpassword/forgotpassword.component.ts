import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import {UserServiceService} from 'src/app/services/user-service.service'
import { MatSnackBar} from '@angular/material';
import {error} from 'util'
import { Router } from '@angular/router';
import {ForgotModel} from 'src/app/model/forgot-model.model';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotModel:ForgotModel=new ForgotModel();
  constructor(private userService:UserServiceService, private snackBar:MatSnackBar,private router:Router) { }


  ngOnInit() {
  }
  
  emailId = new FormControl('', [Validators.required, Validators.email]);
  
  emailErrorMessage() {
    return this.emailId.hasError('required') ? 'You must enter an Email' :
           this.emailId.hasError('email') ? 'Not a valid email' :
           this.emailId.hasError('pattern')?"Enter proper Email Id. abc@gmail.com":
  '';
  }

  onForgotSubmit(){
    this.forgotModel.email=this.emailId.value;
    this.userService.forgotPasswordVerifyMail(this.forgotModel).subscribe(
      (Response:any)=>{
        this.router.navigate(["/login"]);
        localStorage.setItem("jwt-token",Response.token)
        this.snackBar.open('Reset password link sent Successfull..!',"OK",{duration:4000});
      },
      (error:any)=>{
        this.snackBar.open('Bad Credentials',"Ok",{duration:4000});
      }
    );
    
  }
}
