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

  private label:Label =new Label();
  private lname:string;
  onClickCreateLabel(InputLabel){
    this.dialogRef.close();
      this.label.labelName=InputLabel;
      this._labelService.createLabel(this.label).subscribe(
        (response)=>{
        this.matSnackBar.open(response.message,"Ok",{duration:5000});
      });
  }
  onClickDeleteLabel(labelName:string){
    console.log('del lab ',labelName);
    
    this.dialogRef.close();
    this.label.labelName=labelName;
    this._labelService.deleteLabel(this.label.labelName).subscribe(
      (response)=>{
      this.matSnackBar.open(response.message,"Ok",{duration:5000});
    });
  }

  onClickEditLabel(labelId:number,labelName:string){
    this.dialogRef.close();
    this.label.labelName=labelName;
    this.label.labelId=labelId;
    
    this._labelService.editLabel(this.label).subscribe(
      (response)=>{
      this.matSnackBar.open(response.message,"Ok",{duration:5000});
    });
  }
}
