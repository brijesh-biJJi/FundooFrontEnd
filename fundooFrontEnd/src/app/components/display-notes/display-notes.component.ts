import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private _noteService:NoteServiceService) { }


 //varialble for storing NOte Data
 private noteDetails:NoteModel[];
//  private noteDetails=new Array<NoteModel>();


  ngOnInit() {
    this.onClickGetAllNotes();
  }

 
  onClickGetAllNotes(){
    this._noteService.getAllNotes()
          .subscribe((noteData => this.noteDetails=noteData));
          console.log('Notes ',this.noteDetails);
  }
}
