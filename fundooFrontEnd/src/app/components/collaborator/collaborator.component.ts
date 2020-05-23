import { Component, OnInit ,Inject} from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserModel } from 'src/app/model/user-model.model';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  ownerName:string='Brijesh kanchan';
  userEmail:string='brijeshkanchan7@gmail.com';
  noteId:number;
  userModel:UserModel[];
  constructor(private _route:ActivatedRoute,private _matSnackbar:MatSnackBar,@Inject (MAT_DIALOG_DATA) public data:any,private _userService:UserServiceService ) {
    this.noteId=data.noteId;
   }

  ngOnInit() 
  {
    this._userService.refreshNeeded$.subscribe(()=>{
      this.getCollaboratorsList();
      })
    this.getCollaboratorsList();
  }

  getCollaboratorsList(){
    this._userService.getCollaboratorsList(this.noteId).subscribe(
      (response:any)=>{
        console.log('Len ',response.length);
        
        this.userModel=response.obj;
        console.log('Collab ',this.userModel);
        
      }
    )
  }

  addCollab(email){
    console.log('Email ',email,'note id ',this.noteId);
    
    this._userService.addCollab(email,this.noteId).subscribe(
      (response)=>{

     this._matSnackbar.open(response.message,"OK",{duration:5000});
    })
 }
 removeCollab(email){
   console.log('Colob Id',email);
   
  this._userService.removeCollab(email,this.noteId).subscribe(
    (response)=>{
    this._matSnackbar.open(response.message,"OK",{duration:5000});
  })
}



}
