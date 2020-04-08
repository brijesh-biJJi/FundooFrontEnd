import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Label } from 'src/app/model/label.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  labels:Label[];
  changeIcon: boolean;

  constructor(public dialogRef: MatDialogRef<EditLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _labelService:LabelService,private matSnackBar:MatSnackBar) 
    { 
      this._labelService.refreshNeeded$.subscribe(
        ()=>{
          this.labels=data.labels;
      })
      this.labels=data.labels;
    }

  ngOnInit() {
    
   
  }
  onClickCreateLabel(InputLabel){
    let label={
      "labelName":InputLabel
    }
      this._labelService.createLabel(label).subscribe(
        (response)=>{
        this.matSnackBar.open("Label Created","Ok",{duration:5000});
      });
  }
  onClickDeleteLabel(label){
    this._labelService.deleteLabel(label).subscribe(
      (response)=>{
      this.matSnackBar.open("Label Deleted","Ok",{duration:5000});
    });
  }

  onClickEditLabel(label){
    this._labelService.editLabel(label).subscribe(
      (response)=>{
      this.matSnackBar.open("Label Edited","Ok",{duration:5000});
    });
  }
}
