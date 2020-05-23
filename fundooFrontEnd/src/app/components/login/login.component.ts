import { Component, OnInit } from '@angular/core';
import { FormControl,Validators} from '@angular/forms';
import { LoginModel } from 'src/app/model/login-model.model';
import {UserServiceService} from 'src/app/services/user-service.service'
import { MatSnackBar} from '@angular/material';
import {error} from 'util'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel:LoginModel=new LoginModel();
  constructor(private userService:UserServiceService, private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit():void {}
  
  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,Validators.minLength(4)]);
  

  

  emailErrorMessage() {
    return this.emailId.hasError('required') ? 'You must enter an Email' :
           this.emailId.hasError('email') ? 'Not a valid email' :
           this.emailId.hasError('pattern')?"Enter proper Email Id. abc@gmail.com":
  '';
  }
  passwordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a Password' :
           this.password.hasError('minlength') ? 'Password must contain minimum 8 character' :'';
  }

  onLoginSubmit()
  {
    this.loginModel.email=this.emailId.value;
    this.loginModel.password=this.password.value;  
    
    this.userService.loginUser(this.loginModel).subscribe(
      (response:any)=>{
        console.log('hello'+response.token);
        if(response.statusCode===200){
          console.log(" login token ",response.token);
          localStorage.setItem("token",response.token);
          this.router.navigate(["/dashboard"]);
          this.snackBar.open('Login Successfull...',"OK",{duration:2000});
        }else{
          this.snackBar.open('Login fail',"OK",{duration:2000});
        }
      },
      (error:any)=>{
        console.log(error.error.statusMessage);
      }
    );
  }
}

