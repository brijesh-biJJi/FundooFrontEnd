import { Component, OnInit } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';
import { GetNotesService } from 'src/app/services/get-notes.service';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Note } from 'src/app/model/note.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

  constructor(private _router:Router,private _route:ActivatedRoute,private _noteService:NoteServiceService,private _getNoteService:GetNotesService,private matdialog: MatDialog,private _labelService:LabelService) {
    
   }
  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  labelNotes: boolean = false;
  searchNotes:boolean=false;

 //varialble for storing NOte Data
//  private noteDetails:NoteModel[];
//  private archiveNoteDetails:NoteModel[];
private notes:NoteModel[];
 private noteDetails=new Array<NoteModel>();
private pinNotes=new Array<NoteModel>();
// private otherNoteDetails=new Array<NoteModel>();
private searchnote:any;

private param:any;
  ngOnInit() 
  {
    this._noteService.refreshNeeded$.subscribe(() => {
      this.displayNotes();
      this.getAllTrashedNotes();
      this.getAllArchiveNotes();
    });

    this.getSearchNote();
    
    
    // this.param=this._route.snapshot.paramMap.get('note');
    this._route.paramMap.subscribe(
      (params:ParamMap)=>{
        this.param=params.get('note');
      }
    )
    if (this.param == "archive") 
    {
      console.log('Inside Archive ');
      
      this.getAllArchiveNotes();
    }
    else if(this.param == "trash")
    {
      console.log('Inside Trash ');
      this.getAllTrashedNotes();
    }
    else if(this.param == "labels")
    {
      console.log('Inside Labels ');
      this.getAllLabelNotes();
    }
    else
    {
      this.displayNotes();
    }
  }

  displayNotes(){
    this.trashedNotes = false;
    this.archiveNotes = false;
    this._getNoteService.getAllNotes()
    .subscribe(
      (noteData:any)=>{
        this.notes=noteData;
        this.notes.filter(othersNote=>othersNote.isPinned===false&&othersNote.isArchived===false&&othersNote.isTrashed===false).map(othersNote=>this.noteDetails.push(othersNote));
        console.log('Others Notes ',this.noteDetails);
      } 
      );

    this._getNoteService.getAllNotes()
    .subscribe(
      (allNotes:any)=>{
        this.notes=allNotes;
        this.notes.filter(pinNote=>pinNote.isPinned===true&&pinNote.isArchived===false&&pinNote.isTrashed===false).map(pinNote=>this.pinNotes.push(pinNote));
        console.log('Pinned Notes ',this.pinNotes);
        
      }
    );
  }
  getAllArchiveNotes() 
  {
    this.archiveNotes = true;
    this.trashedNotes = false;
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

  getAllTrashedNotes(){
    this.trashedNotes = true;
    this.archiveNotes = false;
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

  getSearchNote(){
    this._noteService.getSearchNote().subscribe(
      (message:any)=>{
        console.log("search data ",message.notes);
        this.searchnote=message.notes;
        this.searchNotes=true;
        if(message.notes==""){
          this.searchNotes=false;
        }
    });
  }

  getAllLabelNotes(){
    this.labelNotes=true;
    this.trashedNotes =false;
    this.archiveNotes = false;
    this._labelService.getLabelNotes().subscribe(
      (response:any)=>{
          this.noteDetails=response.notes;
      }
    )
  }

  getLabelByNoteId(){
    
  }
}
