import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';
import { GetNotesService } from 'src/app/services/get-notes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private _noteService:NoteServiceService,private _getNoteService:GetNotesService,private _route:ActivatedRoute) { }


 //varialble for storing NOte Data
 private noteDetails:NoteModel[];
 private archiveNoteDetails:NoteModel[];
//  private noteDetails=new Array<NoteModel>();

private param:any;
  ngOnInit() 
  {
    this.onClickGetAllNotes();
    this.param=this._route.snapshot.paramMap.get('note');
    if (this.param == "archive") 
    {
      console.log("Archive");
      this.getAllArchiveNotes();
    }
    else
    {
      this._getNoteService.getAllNotes()
    .subscribe((noteData => this.noteDetails=noteData));
    }

    
    
  }

  getAllArchiveNotes() {
 

    this._noteService.getArchiveNotesList()
           .subscribe(
             (message:any) =>{
              this.noteDetails=message;
              console.log('All Note',this.noteDetails);
              
              // this.noteDetails.filter(archNote=> archNote.isPinned===false && archNote.isArchived===true && archNote.isTrashed===false ).map(archNote => this.archiveNoteDetails.push(archNote));
              // if (this.archiveNoteDetails != undefined) { 
              //   this.setArchiveNotes();
              // }
            } 
           );
           console.log('Archive Notes ',this.archiveNoteDetails);
  }
 
  onClickGetAllNotes(){
    
    // this._noteService.getAllNotes()
    //       .subscribe((noteData => this.noteDetails=noteData));
    //       console.log('Notes ',this.noteDetails);
  }



}
