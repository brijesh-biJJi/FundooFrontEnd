import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private _noteService:NoteServiceService) { }

  ngOnInit() {
  }

  //varialble for storing NOte Data
  private noteDetails:[];
  onClickGetAllNotes(){
    this._noteService.getAllNotes()
          .subscribe((noteData => this.noteDetails=noteData));
          console.log('Notes ',this.noteDetails);
  }
}
