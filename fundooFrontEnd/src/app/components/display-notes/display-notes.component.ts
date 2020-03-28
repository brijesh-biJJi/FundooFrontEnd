import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';
import { GetNotesService } from 'src/app/services/get-notes.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private _noteService:NoteServiceService,private _getNoteService:GetNotesService) { }


 //varialble for storing NOte Data
 private noteDetails:NoteModel[];
//  private noteDetails=new Array<NoteModel>();


  ngOnInit() {
    this.onClickGetAllNotes();
  }

 
  onClickGetAllNotes(){
    this._getNoteService.getAllNotes()
    .subscribe((noteData => this.noteDetails=noteData));
    // this._noteService.getAllNotes()
    //       .subscribe((noteData => this.noteDetails=noteData));
    //       console.log('Notes ',this.noteDetails);
  }
}
