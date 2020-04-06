import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { MatTooltip, MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-note-icon',
  templateUrl: './note-icon.component.html',
  styleUrls: ['./note-icon.component.scss']
})
export class NoteIconComponent implements OnInit {

  @Input('noteIconDetail')
  noteDetail:NoteModel;

  isArchive:boolean=false;
  constructor(private _noteService:NoteServiceService,private snackBar: MatSnackBar) { }

  ngOnInit() {
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
      { color: "lime", name: "Lime" },
      { color: "rgb(255, 153, 0)", name: "Orange" },
      { color: "rgb(97, 191, 82)", name: "Green" },
      { color: " rgb(158, 136, 191)", name: "Dark Yellow" },
      
    ]
  ]
}
