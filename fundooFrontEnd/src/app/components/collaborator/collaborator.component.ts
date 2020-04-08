import { Component, OnInit ,Inject} from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UserModel } from 'src/app/model/user-model.model';
import { CollaboratorService } from 'src/app/services/collaborator.service';

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
  constructor(private _matSnackbar:MatSnackBar,@Inject (MAT_DIALOG_DATA) public data:any,private _userService:UserServiceService ,private _colabService:CollaboratorService) {
    this.noteId=data.noteId;
    console.log('Check ',data.noteId);
    
   }

  ngOnInit() {
    this.getCollaboratorsList();
  }

  getCollaboratorsList(){
    // this._colabService.getCollaboratorsList(this.noteId).subscribe(
    //   (response)=>{
    //     this.userModel=response.users;
    //   }
    // )
    this._colabService.getCollaboratorsList(this.noteId).subscribe(
      (response:any)=>{
        console.log('Len ',response.length);
        
        this.userModel=response;
        console.log('Collab ',this.userModel);
        
      }
    )
  }

  addCollab(email){
    console.log('Email ',email,'note id ',this.noteId);
    
    this._colabService.addCollab(email,this.noteId).subscribe(
      (response)=>{
     this._matSnackbar.open(response.message,"OK",{duration:5000});
    })
 }
 removeCollab(userid){
   console.log('Colob Id',userid);
   
  this._colabService.removeCollab(this.noteId,userid).subscribe(
    (response)=>{
    this._matSnackbar.open(response.message,"OK",{duration:5000});
  })
}



}
