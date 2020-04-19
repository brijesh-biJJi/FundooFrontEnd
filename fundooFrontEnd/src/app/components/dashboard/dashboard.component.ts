
import { Component, OnInit, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { Label } from 'src/app/model/label.model';
import { LabelService } from 'src/app/services/label.service';
import { MatSidenav, MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { EventEmitter } from 'protractor';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
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
      console.log('inside view row');
      
      this.view="row";
      this._noteService.setView(this.view);
      this.listview=!this.listview;
      console.log('ListView ', this.listview);
    }
    else{
      console.log('ListView b ', this.listview);
      console.log('inside view col');
      this.view="column";
      this._noteService.setView(this.view);
      this.listview=!this.listview;
      console.log('ListView a', this.listview);
    }
  }

  onSignout() {
    localStorage.clear();
  }

  onClickSearch(){
    // this._noteservice.setSearchNote(this.title);
    this._noteService.setSearchNote(this.title);
  }

  onRefresh(){
    window.location.reload() ;
  }
 

  onClickNote(){
    this._router.navigateByUrl('dashboard');
  }

  onClickReminder(){
    
    this._router.navigate(['reminder'],{relativeTo:this.route});
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

  onClickLabel(labelNote){
    this._labelService.setNoteIdd(labelNote);
     this._router.navigate(['label'],{relativeTo:this.route});
    console.log('Labelll nOet ',labelNote);
    // this._labelService.getNotesByLabel(labelName).subscribe(
    //   (response)=>{
    //     this.setLabelNotes(response);
    //   }
    // );
   
   
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
