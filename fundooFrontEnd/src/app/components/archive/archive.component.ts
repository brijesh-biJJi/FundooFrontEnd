import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private _noteService:NoteServiceService) { }

  ngOnInit() {
    this.getAllArchiveNotes();
  }

  private archiveNotes:NoteModel[];

  getAllArchiveNotes(){
      this._noteService.getArchiveNotes()
      .subscribe(
        (noteData:any) =>{
          this.archiveNotes=noteData;

        });
  }
  

}
