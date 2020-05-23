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
  private label:Label =new Label();
  
  noteId: number;
  labelId;
  lname:string="";
  constructor(private _matDialogRef:MatDialogRef<LabelComponent>,@Inject(MAT_DIALOG_DATA) public data:any,private _labelService:LabelService,private _matSnackbar:MatSnackBar) {
  
    this.noteId=data.noteDetail.noteid;
    this.getAllUserlabel();
   }

  ngOnInit() {
    this._labelService.refreshNeeded$.subscribe(()=>{
      this.getAllUserlabel();
      this.getNoteId();
    })
  }


  getAllUserlabel(){
    this._labelService.getAllLabels().subscribe((response)=>{
      this.labels=response.obj;
      console.log('Labels List',this.labels);
    })
  }

  onClickCreateAndMapLabel(labelInput){

    this._matDialogRef.close();
    this.label.labelName=labelInput;
    this._labelService.addMapLabel(this.label,this.noteId).subscribe(
      (response)=>{
      this._matSnackbar.open(response.message,"Ok",{duration:5000});
    });
  }

  onAddLabel(labelName) {
    this._matDialogRef.close();
    this.label.labelName=labelName;  
    this._labelService.addMapLabel(this.label,this.noteId ).subscribe((data) => {
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
