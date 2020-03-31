import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';
import { GetNotesService } from 'src/app/services/get-notes.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private _router:Router,private _noteService:NoteServiceService,private _getNoteService:GetNotesService,private _route:ActivatedRoute) { }


 //varialble for storing NOte Data
//  private noteDetails:NoteModel[];
//  private archiveNoteDetails:NoteModel[];
private notes:NoteModel[];
 private noteDetails=new Array<NoteModel>();

private param:any;
  ngOnInit() 
  {
    this.param=this._route.snapshot.paramMap.get('note');
    if (this.param == "archive") 
    {
      this.getAllArchiveNotes();
    }
    else if(this.param == "trash")
    {
      this.getAllTrashNotes();
    }
    else
    {
      this._getNoteService.getAllNotes()
    .subscribe((noteData => this.noteDetails=noteData));
    }

    
    
  }

  getAllArchiveNotes() 
  {
      console.log("Archive");
          this._noteService.getAllNotes()
               .subscribe(
                 (allNotes:any) =>{
                  this.notes=allNotes;
                  console.log('All Notes',this.notes);
                  if (this.notes != undefined) { 
                    this.notes.filter(archNote=>archNote.isPinned===false&&archNote.isArchived===true&&archNote.isTrashed===false ).map(archNote=>this.noteDetails.push(archNote));
                    console.log('Archive Notes ',this.noteDetails);
                  }
                } 
               );

  }

  getAllTrashNotes(){
    console.log("Trash");
    this._noteService.getAllNotes()
        .subscribe(
          (allNotes:any)=>{
              this.notes=allNotes;
              console.log('All Notes',this.notes);
                  if (this.notes != undefined) { 
                    this.notes.filter(trashNote=>trashNote.isPinned===false&&trashNote.isArchived===false&&trashNote.isTrashed===true ).map(trashNote=>this.noteDetails.push(trashNote));
                    console.log('Trash Notes ',this.noteDetails);
                  }
          }
        )
  }
}
