import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { MatTooltip, MatSnackBar, MatDialog } from '@angular/material';
import { LabelComponent } from '../label/label.component';
import { LabelService } from 'src/app/services/label.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-note-icon',
  templateUrl: './note-icon.component.html',
  styleUrls: ['./note-icon.component.scss']
})
export class NoteIconComponent implements OnInit {

  @Input('noteIconDetail')
  noteDetail:NoteModel;

  isArchive:boolean=false;
  constructor(private _matDialog:MatDialog,private _noteService:NoteServiceService,private snackBar: MatSnackBar,private _labelService:LabelService) { }

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

  openLabelDialog(noteDetail){
    console.log('note Id:' , noteDetail.noteid);
    const matDialogRef=this._matDialog.open(LabelComponent,{
      width:'20rem',
      height:'auto',
      data:{noteDetail}
    });
    matDialogRef.afterClosed().subscribe(res=>{
      console.log('Dialog Box Closed');
      
    });
  }

  onClickSetNoteId(noteid){
    this._labelService.setNoteId(noteid);
    
  }

  openDialog(){
    const matDialogRef = this._matDialog.open(CollaboratorComponent, {
      width: '38rem',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { noteId: this.noteDetail.noteid }
    });
    matDialogRef.afterClosed().subscribe(result => {
      console.log('The Dialog Box is  closed');
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
      { color: "rgba(174,203,250)", name: "Blue" },
      { color: "lightcoral", name: "Lightcoral" }
    ],
    [
      { color: "#e6c9a8", name: "Brown" },
      { color: "slategray", name: "Grey" },
      { color: "rgb(253,207,232,0.9)", name: "pink" },
      { color: "rgb(200, 232, 104)", name: "Yellow" }
    ],
    [
      { color: "#ccff90", name: "Green" },
      { color: "rgb(255, 153, 0)", name: "Orange" },
      { color: "#d7aefb", name: "Mauve" },
      { color: " rgb(158, 136, 191)", name: "Dark Yellow" },
      
    ]
  ]
}
