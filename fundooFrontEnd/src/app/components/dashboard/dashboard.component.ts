
import { Component, OnInit, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { Label } from 'src/app/model/label.model';
import { LabelService } from 'src/app/services/label.service';
import { MatSidenav, MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { EventEmitter } from 'protractor';
// import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  value = '';
  title:string;
  labels: Label[];
  listview:boolean=false;
  view:string;
  uname:string="Brijesh Kanchan";
  email:string="brijeshkanchan7@gmail.com"
  constructor(private _matDialog: MatDialog,private _router:Router,private route:ActivatedRoute,private _noteService:NoteServiceService,private _labelService:LabelService) { }

  ngOnInit() {
    this.getLabelList();
  }



  gridList(){
    if(this.listview){
      this.view="row";
      this.listview=!this.listview;
    }
    else{
      this.view="column";
      this.listview=!this.listview;
    }
  }

  onSignout() {
    localStorage.clear();
  }

  onClickSearch(){
    // this._noteservice.setSearchNote(this.title);
    this._noteService.setSearchNote(this.title);
  }

 

  onClickNote(){
    this._router.navigateByUrl('dashboard');
  }
  onClickArchive(){
    // this._router.navigate(['/dashboard/displaynote','archive']);
    this._router.navigate(['archive'],{relativeTo:this.route});
  }
  onClickTrash(){
    // this._router.navigate(['/dashboard/displaynote','trash']);
    this._router.navigate(['trash'],{relativeTo:this.route});
  }

  getLabelList(){
    this._labelService.getAllLabels().subscribe(message=>{
         this.labels=message;
    })
  }

  onClickLabel(labelName){
    console.log('Label ',labelName);
    this._labelService.getNotesByLabel(labelName).subscribe(
      (response)=>{
        this.setLabelNotes(response);
      }
    );
  }

  setLabelNotes(notes){
    this._labelService.setLabelNotes(notes);
  }

  openLabelDialog(labels:Label[]): void {
    const matDialogRef = this._matDialog.open(EditLabelComponent , {
      width: '23rem',
      height: 'auto',
      data: { labels }
    });
    matDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
