import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NoteModel} from 'src/app/model/note-model.model';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { MatSnackBar } from '@angular/material';
import { error } from 'util';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  noteModel:NoteModel;
  constructor(private matDialogref:MatDialogRef<UpdateNoteComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _noteService:NoteServiceService,private _matSnackBar:MatSnackBar) {
    this.noteModel=this.data.noteDetail;
   }

  ngOnInit() {
  }

  onClickSubmit(){
      this.matDialogref.close();
      this._noteService.updateNote(this.noteModel).subscribe(
        (response)=>{
          this._matSnackBar.open(response.message,"OK",{duration:5000});
        },
        (error:any)=>{
          this._matSnackBar.open(error.error.message,"Ok",{duration:3000})
        }
      );
  }

}
