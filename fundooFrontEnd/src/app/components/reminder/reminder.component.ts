import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MAT_DIALOG_DATA, MatSnackBar ,DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import { NoteServiceService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  
  date = new FormControl();
    timee : String;
    datee : String;

  constructor( @Inject(MAT_DIALOG_DATA) public data : any, private _noteService : NoteServiceService, private snackBar : MatSnackBar) { }

  ngOnInit() {
    this._noteService.refreshNeeded$.subscribe( response => {
      this.timee;
    })
  }

  time(tim) {
    this.timee = tim;
  }
  addreminder(calen, noteId) {
    console.log('NotesId',noteId);
    console.log('Data  ', this.datee+", "+this.timee);

    
    this.datee = calen;
    this._noteService.addReminder(noteId,  this.datee+", "+this.timee).subscribe( 
        (response) => 
        {
          this.snackBar.open(" Reminder Added Successfully..", "ok", {duration:3000});
        },
        error => {
          this.snackBar.open("Error in Note", "OK", { duration: 3000 });
        });
  }
      
  

  back() {
    window.location.reload();
  }
}
