import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { MatTooltip, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() noteDetail:NoteModel;

 

  isPinned:boolean;
  isArchive:boolean=false;
  constructor(private _noteService:NoteServiceService,private snackBar: MatSnackBar,private matDialog: MatDialog) { }

  ngOnInit() {
    console.log(this.noteDetail);
    
    
  }

  onClickPin(noteId){
    console.log('Note Id ',noteId);
    
    this._noteService.pinNote(noteId).subscribe(
      (response:any)=>{
        this.snackBar.open(response.message, "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });
  }

  onClickArchive(noteId){
    this._noteService.archiveNote(noteId).subscribe((response) =>
     { 
        this.snackBar.open(response.message, "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });
  }

  onClickDeleteNote(noteId){
    console.log('Note Id ',noteId);
      this._noteService.moveToTrash(noteId).subscribe(
      (response:any)=>{
        this.snackBar.open(response.message, "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });
  }

  changeColor(noteId,color){
console.log('Note Id ',noteId,' Color ',color);
    this._noteService.changeColor(noteId,color).subscribe(
      (response:any)=>{
        this.snackBar.open(response.message, "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });

  }

  
  colorArray = [
    [
      { color: " rgb(0,0,255,0.3)", name: "Blue With Opacity" },
      { color: "yellowgreen", name: "Yellow Green" },
      { color: "powderblue", name: "Powder Blue" },
      { color: "lightcoral", name: "Lightcoral" }
    ],
    [
      { color: "magenta", name: "Magenta" },
      { color: "slategray", name: "Grey" },
      { color: "rgb(255, 255, 128)", name: "Dark Golden" },
      { color: "rgb(200, 232, 104)", name: "Yellow" }
    ],
    [
      { color: "lime", name: "lime" },
      { color: "rgb(255, 153, 0)", name: "Orange" },
      { color: "rgb(97, 191, 82)", name: "Green" },
      { color: " rgb(158, 136, 191)", name: "Dark Yellow" },
      
    ]
  ]

}
