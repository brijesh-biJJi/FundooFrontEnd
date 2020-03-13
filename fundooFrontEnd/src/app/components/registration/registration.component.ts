import { Component, OnInit } from '@angular/core';
import { FormControl,Validators,FormBuilder} from '@angular/forms';
import {UserModel} from 'src/app/model/user-model.model'
import {UserServiceService} from 'src/app/services/user-service.service'
import { MatSnackBar} from '@angular/material';
import {error} from 'util'
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userModel:UserModel =new UserModel();
  constructor(private formBuilder:FormBuilder,private userService:UserServiceService, private snackBar:MatSnackBar,private router:Router) { }

  ngOnInit() {
  }

  // registrationForm=this.formBuilder.group({
  //   userName:[null,[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  //   emailMessage:[null, [Validators.required, Validators.email]],
  //   passwordMessage:[null, [Validators.required,Validators.minLength(8)]],
  //   confirmPasswordMessage:[null, [Validators.required,Validators.minLength(8)]],
  //   phoneNumber:[null,[Validators.required,Validators.pattern('[0-9]{10,10}')]]
  // })
  
  userName=new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*')]);
  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,Validators.minLength(8)]);
  confirmPassword = new FormControl('', [Validators.required,Validators.minLength(8)]);
  phoneNumber = new FormControl('',[Validators.required,Validators.pattern('[0-9]{10,10}')]);
  

  nameErrorMessage(){
    return this.userName.hasError('required') ? 'You must enter an UserName' :'';
  }

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
  phoneErrorMessage() {
    return this.phoneNumber.hasError('required') ? 'You must enter your Phone Number' :
           this.phoneNumber.hasError('pattern')? 'Phone Number must contain 10 Digit' :'';
  }

  confirmPasswordErrorMessage(){
    return this.confirmPassword.hasError('required') ? 'You must enter a Password' :
           this.confirmPassword.hasError('minlength') ? 'Password must contain minimum 8 character' :'';
  }
  onRegistrationSubmit()
  {
    try{
      if(this.password.value===this.confirmPassword.value)
      {
        this.userModel.name=this.userName.value;
        this.userModel.email=this.emailId.value;
        this.userModel.password=this.password.value;       
        this.userModel.phone=this.phoneNumber.value;
    
     
        this.userService.registerUser(this.userModel).subscribe(  
        (response:any) =>{
          this.router.navigate(["/login"]);
           this.snackBar.open(response.message, "Ok", {duration:3000})
        },
        error=> {
          this.snackBar.open(error.error.message, "Registration is not Done..", {duration:3000})
        }
       );
      }
      else{
        throw new error;
      }
    }catch(error){
       this.snackBar.open("Confirm Password and Password mismatch", "", {duration:3000})
      }
  }

  //get rfc() { return this.registrationForm.controls; }
}
