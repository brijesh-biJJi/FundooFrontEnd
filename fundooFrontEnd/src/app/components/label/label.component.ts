import { Component, OnInit, Inject } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { Label } from 'src/app/model/label.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  notes: NoteModel[];
  labels: Label[];
  noteId: number;
  labelId;
  lname:string="";
  constructor(private _matDialogRef:MatDialogRef<LabelComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _labelService:LabelService,private _matSnackbar:MatSnackBar) {
    console.log('Note Id',data.noteDetail.noteid);
    this.noteId=data.noteDetail.noteid;
    this.getAllUserlabel();
   }

  ngOnInit() {
    this._labelService.refreshNeeded$.subscribe(()=>{
      console.log('hello');
      
      this.getAllUserlabel();
      this.getNoteId();
    })
  }


  getAllUserlabel(){
    this._labelService.getAllLabels().subscribe((response)=>{
      this.labels=response;
      console.log('Labels List',this.labels);
    })
  }

  onClickCreateLabel(labelInput){
      let label={
        'labelName':labelInput
      }
      this._labelService.createLabel(label).subscribe((response)=>{
        this._matSnackbar.open('Label Created','Ok',{duration:5000});
      })
  }

  onAddLabel(label) {
    console.log('Ts Noteid',this.noteId);
    
    this._labelService.addMapLabel(label,this.noteId ).subscribe((data) => {
      this._matSnackbar.open(data.message, "Ok", { duration: 5000 });
    },
      (error) => {
        this._matSnackbar.open("Failed", "Ok", { duration: 5000 });
      });
  }

  getNoteId(){
      this._labelService.getNoteId().subscribe(
        (message)=>{
          this.noteId=message.labels;
        }
      )
  }
}
