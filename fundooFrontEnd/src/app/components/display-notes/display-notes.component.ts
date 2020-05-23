import { Component, OnInit, OnChanges } from '@angular/core';
import { NoteServiceService } from 'src/app/services/note-service.service';
import { NoteModel } from 'src/app/model/note-model.model';
import { GetNotesService } from 'src/app/services/get-notes.service';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Note } from 'src/app/model/note.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LabelService } from 'src/app/services/label.service';
import { Notes } from 'src/app/model/notes.model';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit{

  constructor(private _router:Router,private _route:ActivatedRoute,private _noteService:NoteServiceService,private _getNoteService:GetNotesService,private matdialog: MatDialog,private _labelService:LabelService) 
  {
    
    // console.log('Disp Const');
    
    // this._route.paramMap.subscribe(
    //   (params:ParamMap)=>{
    //     this.param=params.get('note');
    //   }
    // )
    // if (this.param == "archive") 
    // {
    //   console.log('Inside Archive ');
      
    //   this.getAllArchiveNotes();
    // }
    // else if(this.param == "trash")
    // {
    //   console.log('Inside Trash ');
    //   this.getAllTrashedNotes();
    // }
    // else if(this.param == "label")
    // {
    //   console.log('Inside Labels ');
    //   this.getAllLabelNotes();
    // }
    // else if(this.param == "reminder")
    // {
    //   console.log('Inside Reminder ');
    //   this.getAllReminderNotes();
    // }
    // else
    // {
      
      
    //   this.displayNotes();
    //   this.getView();
    // }
   }
  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  reminderNotes:boolean=false;
  labelNotes: boolean = false;
  searchNotes:boolean=false;

 //varialble for storing NOte Data
//  private noteDetails:NoteModel[];
//  private archiveNoteDetails:NoteModel[];
private notes:Notes[];
 private noteDetails=new Array<Notes>();
//  private noteDetails:Notes[];
private pinNotes:Notes[];
// private otherNoteDetails=new Array<NoteModel>();
private searchnote:any;

private param:any;
  ngOnInit() 
  {
    this._noteService.refreshNeeded$.subscribe(()=>{
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
      else if(this.param == "label")
      {
        console.log('Inside Labels ');
        this.getAllLabelNotes();
      }
      else if(this.param == "reminder")
      {
        console.log('Inside Reminder ');
        this.getAllReminderNotes();
      }
      else
      {
        
        
        this.displayNotes();
        this.getView();
      }
    })

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
    else if(this.param == "label")
    {
      console.log('Inside Labels ');
      this.getAllLabelNotes();
    }
    else if(this.param == "reminder")
    {
      console.log('Inside Reminder ');
      this.getAllReminderNotes();
    }
    else
    {
      
      
      this.displayNotes();
      this.getView();
    }
  }

  // ngOnChanges(){
  //   // this._noteService.refreshNeeded$
  //   // .subscribe(() => {
  //   //   this.displayNotes();
  //   //   this.getAllTrashedNotes();
  //   //   this.getAllArchiveNotes();
  //   // });

    
  //   this.getSearchNote();
    
    
  //   // this.param=this._route.snapshot.paramMap.get('note');
  //   this._route.paramMap.subscribe(
  //     (params:ParamMap)=>{
  //       this.param=params.get('note');
  //     }
  //   )
  //   if (this.param == "archive") 
  //   {
  //     console.log('Inside Archive ');
      
  //     this.getAllArchiveNotes();
  //   }
  //   else if(this.param == "trash")
  //   {
  //     console.log('Inside Trash ');
  //     this.getAllTrashedNotes();
  //   }
  //   else if(this.param == "label")
  //   {
  //     console.log('Inside Labels ');
  //     this.getAllLabelNotes();
  //   }
  //   else if(this.param == "reminder")
  //   {
  //     console.log('Inside Reminder ');
  //     this.getAllReminderNotes();
  //   }
  //   else
  //   {
      
      
  //     this.displayNotes();
  //     this.getView();
  //   }
  // }

  view:string;
  getView(){
    this._noteService.getView().subscribe(
      (response:any)=>{
               this.view=response.view;
           }
    );
    console.log('View ',this.view);
    
  }

  displayNotes(){
    console.log('check 1');
    this.trashedNotes = false;
    this.archiveNotes = false;
    this._noteService.getOtherNotes()
    .subscribe(
      (response:any)=>{
         this.noteDetails=response['obj'];

        if (this.noteDetails != undefined) {
          this.setnotes(this.noteDetails);
        }
      } 
      );


    this._noteService.getNotesList()
    .subscribe(message => 
      {
        this.noteDetails = message.notes;
        console.log('Display Note detail ',this.noteDetails);
        
    });

    this._noteService.getAllPinNotes()
    .subscribe(
      (allNotes:any)=>{
        this.pinNotes=allNotes.obj;
        if (this.pinNotes != undefined) {
             this.setPinNotes(this.pinNotes);
        }
      }
    );
    this._noteService.getPinNotesList().subscribe(message => {
      this.pinNotes = message.notes;
      console.log('Pinned Notes ',this.pinNotes);
    });

  }


  getAllArchiveNotes() 
  {
    this.archiveNotes = true;
    this.trashedNotes = false;
      console.log("Archive");
          this._noteService.getAllArchiveNotes()
               .subscribe(
                 (allNotes:any) =>{
                  this.noteDetails=allNotes.obj;
                  if (this.noteDetails != undefined) {
                       this.setArchiveNotes(this.noteDetails);
                    }
                } 
               );

          this._noteService.getArchiveNotesList().subscribe(message => {
            this.noteDetails = message.notes;
            console.log('Archive Notes ',this.noteDetails);
          });

  }

  getAllTrashedNotes(){
    this.trashedNotes = true;
    this.archiveNotes = false;
    this._noteService.getAllTrashedNotes()
        .subscribe(
          (allNotes:any)=>{
              this.noteDetails=allNotes.obj;
              
              if (this.noteDetails != undefined) {
                         this.setTrasheNotes(this.noteDetails);
               }
          }
        );

    this._noteService.getTrashedNotesList().subscribe(
      message => {
        this.noteDetails = message.notes;
        console.log('Trash Notes ',this.noteDetails);
    });
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

  getAllReminderNotes(){
    console.log('Reminder meth');
    this.reminderNotes=true;
    this.labelNotes=false;
    this.trashedNotes =false;
    this.archiveNotes = false;
    this._noteService.getAllNotes()
        .subscribe(
          (allNotes:any)=>{
              this.notes=allNotes.obj;
              console.log('All Notes',this.notes);
                  if (this.notes != undefined) { 
                    this.notes.filter(remNote=>remNote.reminder!=null ).map(remNote=>this.noteDetails.push(remNote));
                    console.log('Reminder Notes ',this.noteDetails);
                  }
          }
        )
  }


  setnotes(noteDetail) {
    console.log("setNotes");
    this._noteService.setNotesList(noteDetail);
  }
  setPinNotes(pinNoteDetail) {
    console.log("setPinNotes");
    this._noteService.setPinNotesList(pinNoteDetail);
  }
  setArchiveNotes(archiveNoteDetail){
    console.log("setArchiveNotes");
    this._noteService.setArchiveNotesList(archiveNoteDetail);
    
  }
  setTrasheNotes(trashNoteDetail) {
    console.log("setTrashNotes");
    this._noteService.setTrashedNotesList(trashNoteDetail);
  }

}
