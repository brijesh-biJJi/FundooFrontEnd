import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MAT_DIALOG_DATA, MatSnackBar ,DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS,MatDialogRef} from '@angular/material';
import { NoteServiceService } from 'src/app/services/note-service.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';  
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput:'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Time {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReminderComponent implements OnInit {
  date = new FormControl(moment());
  noteId:number;
  

  constructor(private _matDialogRef:MatDialogRef<ReminderComponent>, @Inject(MAT_DIALOG_DATA) public data : any, private _noteService : NoteServiceService, private snackBar : MatSnackBar) { 
    this.noteId=data.noteId;
    console.log('ch ',this.noteId);
    
  }

  ngOnInit() {
    
  }

  reminderTime:string;
  reminderDate:any;
  setReminder:any;

  times: Time[] = [
    {value: '9:00', viewValue: ' Morning 8:00 AM'},
    {value: '2:00', viewValue: 'Afternoon 1:00 PM'},
    {value: '7:00', viewValue: 'Evening 6:00 PM'},
    {value: '9:00', viewValue: 'Night 8:00 PM'}
  ];

  repeatReminder = [ {value: 'Does not repeat'},
  {value: 'Daily'},
  {value: 'Weekly'},
  {value: 'Monthly'},
  {value: 'Yearly'}];


  
  saveReminder(date:any) {
    this._matDialogRef.close();
  this.setReminder = date+","+this.reminderTime+":00";
  
  let newDate = new Date(this.setReminder);
  console.log("formatted date:",newDate);
  
  let reminder={
    reminder:newDate
  }
  
    this._noteService.addReminder(this.noteId , reminder).subscribe( 
        (response) => 
        {
          this.snackBar.open(response['message'], "ok", {duration:3000});
        },
        error => {
          this.snackBar.open("Error in Note", "OK", { duration: 3000 });
        });
  }
      
  setTime(time:any){
    this.reminderTime = time;
  }

  back() {
    window.location.reload();
  }
}
