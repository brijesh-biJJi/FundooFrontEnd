import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/model/note-model.model';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';


@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})
export class SingleNoteComponent implements OnInit {
  
  @Input() noteDetail:NoteModel;
  constructor() { }

  ngOnInit() {
    console.log(this.noteDetail);
    
  }

 

}
