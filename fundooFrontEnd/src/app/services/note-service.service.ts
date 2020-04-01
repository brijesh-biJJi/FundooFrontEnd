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

  private _refresh= new Subject();
  get refresh() {
    return this._refresh;
  }

  private noteApiUrl=environment.noteApiURL;
  private createNoteUrl=environment.createNote;
  private getAllNotesUrl=environment.getAllNotes;

  private archiveNoteList = new Subject<any>();
  
  private httpContent={
    headers:new HttpHeaders({'content-type':'application/json'})
  };
  
   constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }

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
