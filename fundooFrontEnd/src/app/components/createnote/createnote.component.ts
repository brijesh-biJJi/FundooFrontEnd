import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { Note } from 'src/app/model/note.model';
import { NoteModel } from 'src/app/model/note-model.model';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.scss']
})
export class CreatenoteComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private router:Router,private matSnackBar:MatSnackBar,private _noteService:NoteServiceService) { }
  hide: boolean = false;

  noteModel:NoteModel=new NoteModel();
  ngOnInit() {
  }

  title=new FormControl('',[Validators.required]);
  description=new FormControl('',[Validators.required]);

  onClick(){
    this.hide=true;
  }

  onClickCreateNote(){
    this.noteModel.title=this.title.value;
    this.noteModel.description=this.description.value;
    this._noteService.createNote(this.noteModel).subscribe(
      (response:any)=>{
        this.matSnackBar.open("Note Created..", "OK", {duration:5000})
      },
      (error:any)=> {
        this.matSnackBar.open("Failed", "OK", {duration:5000})
      }
    );
  }  
}
