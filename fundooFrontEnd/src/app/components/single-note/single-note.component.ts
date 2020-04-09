import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { MatTooltip, MatSnackBar, MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() noteDetail:NoteModel;

 

  isPinned:boolean;
    
  constructor(private _noteService:NoteServiceService,private snackBar: MatSnackBar,private matDialog: MatDialog,private _labelService:LabelService) { }

  ngOnInit() {
    console.log(this.noteDetail);
    
    this.getLabel();
  }

  private labelArray:[];
  getLabel(){
    this._labelService.getAllLabels().subscribe(
      (response:any)=>{
          this.labelArray=response;
          console.log('Labell ',this.labelArray);
          
      }
    )
  }

  openMatDialog(noteDetail){
    console.log('Note Details ',noteDetail);
    const matDialogRef=this.matDialog.open(
      UpdateNoteComponent,
      {
        panelClass:'custom_dialog_container',
        width:'auto',
        data:{noteDetail}
      });
    matDialogRef.afterClosed().subscribe(msg=>{
      console.log('Dialog closed');
      
    });
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
}
