import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable ,Subject, BehaviorSubject} from 'rxjs';
import { NoteModel } from 'src/app/model/note-model.model';
import { Notes } from '../model/notes.model';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private _refreshNeeded$= new Subject<any>();
  private view=new Subject<any>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  private noteApiUrl=environment.noteApiURL;
  private createNoteUrl=environment.createNote;
  private archiveNoteUrl=environment.archiveNote;


  private searchNote=new Subject<any>();

  private notesList = new Subject<any>();
  private pinNoteList = new Subject<any>();
  private archiveNoteList = new Subject<any>();
  private trashedNoteList = new Subject<any>();
  
  private httpContent={
    headers:new HttpHeaders({'content-type':'application/json'})
  };
  
   constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }


  
   setView(data:any){
     console.log('Service set ');
     
    this.view.next({view:data});
    console.log('data ',this.view);
    
  }

  getView():Observable<any>{
    console.log('Service get');
    return this.view.asObservable();
  }

   createNote(noteDetails:any):Observable<any>
   {
     console.log('Create Note Service ');
      return this._httpService
                 .postRequest(`${this.noteApiUrl}/${this.createNoteUrl}`,noteDetails,{headers:new HttpHeaders({'token':localStorage.token})})
                 .pipe(
                  tap(()=>
                  {
                     this._refreshNeeded$.next();
                  }));
   }

   getAllNotes():Observable<any>
      {
        
        return this._httpService.get(`${this.noteApiUrl}/${environment.getAllNotes}`,{headers:new HttpHeaders({'token':localStorage.token})});       
        // return this._httpClient.get<any>(this._getNotesUrl);
      }

      getOtherNotes():Observable<any>
      {
        
        return this._httpService.get(`${this.noteApiUrl}/${environment.getOtherNotes}`,{headers:new HttpHeaders({'token':localStorage.token})});       
        // return this._httpClient.get<any>(this._getNotesUrl);
      }

      getAllPinNotes():Observable<any>
      {
        
        return this._httpService.get(`${this.noteApiUrl}/${environment.getPinnedNotes}`,{headers:new HttpHeaders({'token':localStorage.token})});       
        // return this._httpClient.get<any>(this._getNotesUrl);
      }

      getAllArchiveNotes():Observable<any>
      {
        console.log('Get Archive Not Url',`${this.noteApiUrl}/${environment.getAllArchiveNotes}`);
        
        return this._httpService.get(`${this.noteApiUrl}/${environment.getAllArchiveNotes}`,{headers:new HttpHeaders({'token':localStorage.token})});       
        // return this._httpClient.get<any>(this._getNotesUrl);
      }

      getAllTrashedNotes():Observable<any>
      {
        console.log('Get Trashed Not Url' ,`${this.noteApiUrl}/${environment.getAllTrashNotes}`);
        
        return this._httpService.get(`${this.noteApiUrl}/${environment.getAllTrashNotes}`,{headers:new HttpHeaders({'token':localStorage.token})});       
        // return this._httpClient.get<any>(this._getNotesUrl);
      }

      addReminder(noteId:number,data:any):Observable<any>{
        return this._httpService
                   .putRequest(`${this.noteApiUrl}/${environment.addReminder}/${noteId}`, data,{headers:new HttpHeaders({'token':localStorage.token})})
                   .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
      }

      removeReminder(noteId:number):Observable<any>{
        return this._httpService
                   .putRequest(`${this.noteApiUrl}/${environment.removeReminder}/${noteId}`, {},{headers:new HttpHeaders({'token':localStorage.token})})
                   .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
      }

      archiveNote(noteId: any):Observable<any>
      {
         return this._httpService
                    .putRequest(`${this.noteApiUrl}/${this.archiveNoteUrl}/${noteId}`, {},{headers:new HttpHeaders({'token':localStorage.token})})
                    .pipe(
                      tap(()=>
                      {
                         this._refreshNeeded$.next();
                      }));
      }

      pinNote(noteId: any):Observable<any>
      {
          return this._httpService
                     .putRequest(`${this.noteApiUrl}/${environment.pinNote}/${noteId}`, {},{headers:new HttpHeaders({'token':localStorage.token})})
                     .pipe(
                      tap(()=>
                      {
                         this._refreshNeeded$.next();
                      }));
      }

      moveToTrash(noteId:any){
        return this._httpService
                   .deleteRequest(`${this.noteApiUrl}/${environment.trashNote}/${noteId}`, {headers:new HttpHeaders({'token':localStorage.token})})
                   .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
      }

      deleteNotePermanently(noteId:any){
        return this._httpService
                   .deleteRequest(`${this.noteApiUrl}/${environment.deletePermanently}/${noteId}`, {headers:new HttpHeaders({'token':localStorage.token})})
                   .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
      }

      changeColor(noteId,color):Observable<any>{
        return this._httpService
                   .putRequest(`${this.noteApiUrl}/${environment.changecolor}?noteId=${noteId}&color=${color}`, {},{headers:new HttpHeaders({'token':localStorage.token})})
                   .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
      }

      setSearchNote(message:any){
        // return this._httpService.get(`${this.noteApiUrl}/${environment.searchNote}?title=${title}`,{headers:new HttpHeaders({'token':localStorage.token})});
        this.searchNote.next(
                              {
                                  notes:message
                              }
                            );
      }

      getSearchNote():Observable<any>{
        return this.searchNote.asObservable();
      }

      updateNote(noteDetails:any):Observable<any>{
        return this._httpService.putRequest(`${this.noteApiUrl}/${environment.updateNote}`,noteDetails,{headers:new HttpHeaders({'token':localStorage.token})});
      }


      setNotesList(message: Notes[]) {
        console.log('Set Note Data in nOte service ',message);
        
        this.notesList.next({ notes: message });
      }
      getNotesList(): Observable<any> {
        console.log("getNotesListService Call");
        return this.notesList.asObservable();
      }
      setPinNotesList(message: Notes[]) {
        this.pinNoteList.next({ notes: message });
      }
      getPinNotesList(): Observable<any> {
        return this.pinNoteList.asObservable();
      }
      setTrashedNotesList(message: Notes[]) {
        console.log("TrashNote Service set");
        this.trashedNoteList.next({ notes: message });
      }
      getTrashedNotesList(): Observable<any> {
        console.log("trashNote Service Get");
        return this.trashedNoteList.asObservable();
      }
      setArchiveNotesList(message: Notes[]) {
        console.log("archiveNote Service set");
        this.archiveNoteList.next({ notes: message });
      }
      getArchiveNotesList(): Observable<any> {
        console.log("getArchive Service Get");
        return this.archiveNoteList.asObservable();
      }
}
