import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  private noteApiUrl=environment.noteApiURL;
  
  private httpContent={
    headers:new HttpHeaders({'content-type':'application/json'})
  };
  
   constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }

   createNote(noteDetails:any):Observable<any>
   {
      return this._httpService.postRequest(this.noteApiUrl+environment.createNote,noteDetails,{headers:new HttpHeaders({'token':localStorage.token})});
   }
}
