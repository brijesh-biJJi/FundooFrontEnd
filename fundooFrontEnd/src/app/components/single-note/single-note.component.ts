import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { MatTooltip, MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { LabelService } from 'src/app/services/label.service';
import { Notes } from 'src/app/model/notes.model';
import { Label } from 'src/app/model/label.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() noteDetail:Notes;
  labels:Label[];
  // collaborators:User[];
  datePipeString : string;
  displayReminder :string;

  isPinned:boolean;
    
  constructor( private datePipe: DatePipe,private _noteService:NoteServiceService,private snackBar: MatSnackBar,private matDialog: MatDialog,private _labelService:LabelService) {
    this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
   }

  ngOnInit() {

    this._labelService.refreshNeeded$.subscribe(()=>{
      this.labels=this.noteDetail.labelList;
    })

    this.labels=this.noteDetail.labelList;
    console.log("type of reminder:",typeof this.noteDetail.reminder);
    this.slice();
  }

  openMatDialog(noteDetail){
    console.log('Note Details ',noteDetail);
    const matDialogRef=this.matDialog.open
    (
      UpdateNoteComponent,
      {
        panelClass:'custom_dialog_container',
        width:'auto',
        data:{noteDetail}
      }
    );
    matDialogRef.afterClosed().subscribe(msg=>{
      console.log('Dialog closed');
      
    });
  }


  onClickPin(noteId){
    console.log('Note Id ',noteId);
    
    this._noteService.pinNote(noteId).subscribe(
      (response:any)=>{
        this.snackBar.open(response.message, "OK", { duration: 5000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });
  }

  deletePermanently(noteId){
    this._noteService.deleteNotePermanently(noteId).subscribe(
      (response:any)=>{
        this.snackBar.open(response['message'], "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });

  }

  deleteNote(noteId){
    this._noteService.moveToTrash(noteId).subscribe(
      (response:any)=>{
        this.snackBar.open(response.message, "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });
  }

  private label:Label =new Label();
  removeNoteLabel(labelName,noteId){
    this.label.labelName=labelName;    
    this._labelService.removelabel(this.label,noteId ).subscribe((data) => {
      this.snackBar.open(data.message, "Ok", { duration: 5000 });
    },
      (error) => {
        this.snackBar.open("Failed", "Ok", { duration: 5000 });
      });

  }

  slice()
  {
    var rem = this.noteDetail.reminder;
    var today = this.datePipeString;
    if(rem!=null){
var res = rem.slice(0,-9);
    }
    else{
      res = null;
    }
console.log("result:",res);
console.log("this only:",today);

const cal = new Date();
cal.setDate(cal.getDate() + 1);
var reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
var tommorrowDate = this.datePipe.transform(reminderDate,'yyyy-MM-dd');

if(today==res)
{
  this.displayReminder = "Today,8:00PM"
  console.log('check display today ',this.displayReminder);
  
}

else if(tommorrowDate==res){
this.displayReminder = "Tommorrow,8:00AM"
}

else{
  this.displayReminder = rem;
}

  }

  removeReminder(noteId:any){
    this._noteService.removeReminder(noteId).subscribe(
      (response:any)=>{
        this.snackBar.open(response.message, "OK", { duration: 2000 });
      },
      error => {
        this.snackBar.open("Error in Note", "OK", { duration: 5000 });
      });
  }
}
