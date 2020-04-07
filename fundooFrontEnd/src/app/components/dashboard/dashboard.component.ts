
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { Label } from 'src/app/model/label.model';
import { LabelService } from 'src/app/services/label.service';
import { MatSidenav, MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';
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

  constructor(private _matDialog: MatDialog,private _router:Router,private route:ActivatedRoute,private _noteService:NoteServiceService,private _labelService:LabelService) { }

  ngOnInit() {
    this.getLabelList();
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

  onClickLabel(labelId){
    console.log('Label ',labelId);
    
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
