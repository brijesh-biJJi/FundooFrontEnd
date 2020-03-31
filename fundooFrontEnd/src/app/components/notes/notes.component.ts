import { Component, OnInit } from '@angular/core';

import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';
import { GetNotesService } from 'src/app/services/get-notes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private _noteService:NoteServiceService,private _getNoteService:GetNotesService,private _route:ActivatedRoute) { }


//   //varialble for storing NOte Data
//   private noteDetails:NoteModel[];
//   private archiveNoteDetails=new Array<NoteModel>();
//  //  private noteDetails=new Array<NoteModel>();
 
//  private param:any;

   ngOnInit() {
//     this.param=this._route.snapshot.paramMap.get('note');
//     if (this.param == "archive") 
//     {
//       console.log("Archive");
//       this._noteService.getArchiveNotes()
//            .subscribe(
//              (archiveNote:any) =>{
//               this.noteDetails=archiveNote;
//               console.log('All Notes',this.noteDetails);
//               if (this.noteDetails != undefined) { 
//                 this.noteDetails.filter(archNote=>archNote.isPinned===false&&archNote.isArchived===true&&archNote.isTrashed===false ).map(archNote=>this.archiveNoteDetails.push(archNote));
//                 console.log('Archive Notes1 ',this.archiveNoteDetails);
//               }
//             } 
//            );
//            console.log('Archive Notes 2',this.archiveNoteDetails);
//     }
//     else
//     {
//       this._getNoteService.getAllNotes()
//     .subscribe((noteData => this.noteDetails=noteData));
//     }
   }


//   setArchiveNotes(){
//     console.log("set ArchiveNotes");
//     this._noteService.setArchiveNotesList(this.noteDetails);
//   }
}
