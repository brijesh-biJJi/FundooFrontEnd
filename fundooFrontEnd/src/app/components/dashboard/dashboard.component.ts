
import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
// import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  value = '';

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  onSignout() {
    localStorage.clear();
  }

  onClickNote(){
    this._router.navigateByUrl('dashboard');
  }
  onClickArchive(){
    this._router.navigate(['/displaynote','archive']);
  }
  onClickTrash(){
    this._router.navigate(['/displaynote','trash']);
  }
}
