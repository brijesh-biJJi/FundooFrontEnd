import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNotesService {

  constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }
  private _getNotesUrl:string='/assets/NoteData/noteinfo.json';
   getAllNotes():Observable<any>
   {
    return this._httpClient.get<any>(this._getNotesUrl);
   }
}
