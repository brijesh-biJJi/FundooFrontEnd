import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable ,Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private noteId = new Subject<any>();
  private _refreshNeeded$= new Subject();
  private labelsNotes=new Subject<any>();
  

  private httpContent={
    headers:new HttpHeaders({'content-type':'application/json'})
  };
  
   constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }

   get refreshNeeded$() {
    return this._refreshNeeded$;
  }

   //Url for retrieving Label Data
   private _getLabelsUrl:string='/assets/NoteData/label.json';
     
  getAllLabels():Observable<any>{
    console.log('hi');
    
    // return this._httpService.get(`${environment.labelApiURL}/${environment.getAllLabels}`, {headers:new HttpHeaders({'token':localStorage.token})});
    return this._httpClient.get<any>(this._getLabelsUrl); 
  }

  createLabel(label):Observable<any>{
    return this._httpService.postRequest(`${environment.labelApiURL}/${environment.createLabel}`, label,{headers:new HttpHeaders({'token':localStorage.token})});
  }
  deleteLabel(label):Observable<any>{
    return this._httpService.putRequest(`${environment.labelApiURL}/${environment.deleteLabel}`, label,{headers:new HttpHeaders({'token':localStorage.token})}); 
  }

  editLabel(label):Observable<any>{
    return this._httpService.putRequest(`${environment.labelApiURL}/${environment.deleteLabel}`, label,{headers:new HttpHeaders({'token':localStorage.token})}); 
  }

  setNoteId(noteid){
    this.noteId.next({labels:noteid});
  }
  getNoteId(): Observable<any> {
    return this.noteId.asObservable();
  }

  addMapLabel(label,noteId){
    return  this._httpService.postRequest(`${environment.labelApiURL}/${environment.addMapLabel}?noteId=${noteId}`,label,{headers:new HttpHeaders({'token':localStorage.token})});
  }

  getNotesByLabel(labelName){
    return this._httpService.get(`${environment.labelApiURL}/${environment.getNotesByLabel}?labelName=${labelName}`,{headers:new HttpHeaders({'token':localStorage.token})});
  }

  setLabelNotes(data:any){
    this.labelsNotes.next({notes:data});
  }

  getLabelNotes():Observable<any>{
    return this.labelsNotes.asObservable();
  }
}

