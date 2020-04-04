
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { NoteServiceService } from 'src/app/services/note-service.service';
// import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  value = '';
  title:string;

  constructor(private _router:Router,private route:ActivatedRoute,private _noteService:NoteServiceService) { }

  ngOnInit() {
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
}
