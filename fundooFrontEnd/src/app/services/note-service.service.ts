import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable ,Subject, BehaviorSubject} from 'rxjs';
import { NoteModel } from 'src/app/model/note-model.model';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private _refreshNeeded$= new Subject<void>();
  private view=new Subject<any>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  private noteApiUrl=environment.noteApiURL;
  private createNoteUrl=environment.createNote;
  private archiveNoteUrl=environment.archiveNote;
  private getAllNotesUrl=environment.getAllNotes;

  private archiveNoteList = new Subject<any>();
  private searchNote=new Subject<any>();
  
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
      return this._httpService.postRequest(this.noteApiUrl+this.createNoteUrl,noteDetails,{headers:new HttpHeaders({'token':localStorage.token})});
   }

   //Url for retrieving Note Data
   private _getNotesUrl:string='/assets/NoteData/noteinfo.json';
      getAllNotes():Observable<any>
      {
        return this._httpClient.get<any>(this._getNotesUrl);
      }

      addReminder(noteId:any,data:any){
        return this._httpService.putRequest(`${this.noteApiUrl}/${this.addReminder}?id=${noteId}`, {data},{headers:new HttpHeaders({'token':localStorage.token})});
      }

      archiveNote(noteId: any)
      {
          return this._httpService.putRequest(`${this.noteApiUrl}/${this.archiveNoteUrl}?id=${noteId}`, {},{headers:new HttpHeaders({'token':localStorage.token})});
      }

      pinNote(noteId: any)
      {
          return this._httpService.putRequest(`${this.noteApiUrl}/${environment.pinNote}?id=${noteId}`, {},{headers:new HttpHeaders({'token':localStorage.token})});
      }

      moveToTrash(noteId:any){
        return this._httpService.putRequest(`${this.noteApiUrl}/${environment.trashNote}?id=${noteId}`, {},{headers:new HttpHeaders({'token':localStorage.token})});
      }

      changeColor(noteId,color){
        return this._httpService.putRequest(`${this.noteApiUrl}/${environment.changecolor}?noteId=${noteId}&color=${color}`, {},{headers:new HttpHeaders({'token':localStorage.token})});
      }

      setSearchNote(message:any){
        // return this._httpService.get(`${this.noteApiUrl}/${environment.searchNote}?title=${title}`,{headers:new HttpHeaders({'token':localStorage.token})});
        this.searchNote.next({notes:message});
      }

      getSearchNote():Observable<any>{
        return this.searchNote.asObservable();
      }

      updateNote(noteDetails:any){
        return this._httpService.putRequest(`${this.noteApiUrl}/${environment.updateNote}`,noteDetails,{headers:new HttpHeaders({'token':localStorage.token})});
      }


      // setArchiveNotesList(message:  NoteModel[]) {
      //   console.log("Set Archive Note");
      //   this.archiveNoteList.next({ notes: message });
      // }
      // getArchiveNotesList(): Observable<any> {
      //   console.log("Get Archive Note");
      //   return this.archiveNoteList.asObservable();
      // }

   //Url for retrieving Note Data
  //  private _getNotesUrl:string='/assets/NoteData/noteinfo.json';
  //  getAllNotes():Observable<any>
  //  {
  //   return this._httpClient.get<any>(this._getNotesUrl);
  //   //  return this._httpService.getRequest(this._getNotesUrl);
  //   //  return this._httpService.getRequest(this.noteApiUrl+this.getAllNotesUrl);
  //  }
}
