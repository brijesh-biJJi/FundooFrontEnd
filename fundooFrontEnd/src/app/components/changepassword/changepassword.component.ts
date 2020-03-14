import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import {UserServiceService} from 'src/app/services/user-service.service'
import { MatSnackBar} from '@angular/material';
import {error} from 'util'
import { Router } from '@angular/router';
import { ChangePassModel } from 'src/app/model/change-pass-model.model';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  changePassModel:ChangePassModel=new ChangePassModel();
  constructor(private userService:UserServiceService, private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
  }
  
  password = new FormControl('', [Validators.required,Validators.minLength(4)]);
  confirmPassword = new FormControl('', [Validators.required,Validators.minLength(4)]);
  

  passwordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a Password' :
           this.password.hasError('minlength') ? 'Password must contain minimum 8 character' :'';
  }

  confirmPasswordErrorMessage(){
    return this.confirmPassword.hasError('required') ? 'You must enter a Password' :
           this.confirmPassword.hasError('minlength') ? 'Password must contain minimum 8 character' :'';
  }

  onForgotPassword(){
    try{
      if(this.password.value===this.confirmPassword.value)
      {
        this.changePassModel.confirmPassword=this.confirmPassword.value;
        this.changePassModel.password=this.password.value;  
        this.userService.changePassword(this.changePassModel).subscribe(
          (Response:any)=>{
            console.log('UI check '+Response.message);
            this.router.navigate(["/login"]);
            this.snackBar.open(Response.message,"OK",{duration:4000});
          },
          (error:any)=>{
            console.log('Error ');
            // this.snackBar.open(error.error.statusMessage,"",{duration:4000});
          }
        );
      }
    }catch(error){
        this.snackBar.open("Confirm Password and Password mismatch", "", {duration:3000})
       }
  }
}
