import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable } from 'rxjs';
import { NoteModel } from 'src/app/model/note-model.model';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private noteApiUrl=environment.noteApiURL;
  private createNoteUrl=environment.createNote;
  private getAllNotesUrl=environment.getAllNotes;
  
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
      getArchiveNotes():Observable<any>
      {
        return this._httpClient.get<any>(this._getNotesUrl);
      }

   //Url for retrieving Note Data
  //  private _getNotesUrl:string='/assets/NoteData/noteinfo.json';
  //  getAllNotes():Observable<any>
  //  {
  //   return this._httpClient.get<any>(this._getNotesUrl);
  //   //  return this._httpService.getRequest(this._getNotesUrl);
  //   //  return this._httpService.getRequest(this.noteApiUrl+this.getAllNotesUrl);
  //  }
}
