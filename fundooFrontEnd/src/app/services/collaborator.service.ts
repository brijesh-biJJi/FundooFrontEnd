import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import {Observable,Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private _httpService:HttpserviceService,private _httpClient:HttpClient) { }

  //Collaborator User url
  private _getCollabUser:string='assets/NoteData/user.json'
getCollaboratorsList(noteId):Observable<any>{

  // return this._httpService.get(`${environment.userApiUrl}/${environment.collaborator}?noteId=${noteId}`,{headers:new HttpHeaders({'token':localStorage.token})});
  return this._httpClient.get(this._getCollabUser);
}

addCollab(email,noteId):Observable<any>{
  return this._httpService.postRequest(`${environment.userApiUrl}/${environment.addCollab}?noteid=${noteId}&email=${email}`,{},{headers:new HttpHeaders({'token':localStorage.tokan})});
}

removeCollab(collabId,noteId):Observable<any>{
  return this._httpService.postRequest(`${environment.userApiUrl}/${environment.removeCollab}?noteid=${noteId}&collabId=${collabId}`,{},{headers:new HttpHeaders({'token':localStorage.tokan})});
}


}
