import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable ,Subject, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private noteId = new Subject<any>();
  private _refreshNeeded$= new Subject<any>();
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
    
     return this._httpService.get(`${environment.labelApiURL}/${environment.getAllLabels}`, {headers:new HttpHeaders({'token':localStorage.token})});
    // return this._httpClient.get<any>(this._getLabelsUrl); 
  }

  createLabel(label:any):Observable<any>{
    return this._httpService
                .postRequest(`${environment.labelApiURL}/${environment.createLabel}`, label,{headers:new HttpHeaders({'token':localStorage.token})})
                .pipe(
                 tap(()=>
                 {
                    this._refreshNeeded$.next();
                 }));
  }
  deleteLabel(labelName:any):Observable<any>{
    return this._httpService
                .deleteRequest(`${environment.labelApiURL}/${environment.deleteLabel}/${labelName}`,{headers:new HttpHeaders({'token':localStorage.token})})
                .pipe(
                  tap(()=>
                  {
                     this._refreshNeeded$.next();
                  })); 
  }

  editLabel(label:any):Observable<any>{
    return this._httpService
                  .putRequest(`${environment.labelApiURL}/${environment.editLabel}`, label,{headers:new HttpHeaders({'token':localStorage.token})})
                  .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
  }

  removelabel(label:any,noteId:number):Observable<any>{
    return this._httpService
                  .putRequest(`${environment.labelApiURL}/${environment.removeNoteLabel}/${noteId}`, label,{headers:new HttpHeaders({'token':localStorage.token})})
                  .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    })); 
  }

  setNoteId(noteid){
    this.noteId.next({labels:noteid});
  }
  getNoteId(): Observable<any> {
    return this.noteId.asObservable();
  }

  addMapLabel(label,noteId){
    return  this._httpService
                  .putRequest(`${environment.labelApiURL}/${environment.addMapLabel}?noteId=${noteId}`,label,{headers:new HttpHeaders({'token':localStorage.token})})
                  .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
  }

  getNotesByLabel(labelName){
    return this._httpService
                  .get(`${environment.labelApiURL}/${environment.retrieveNotes}/${labelName}`,{headers:new HttpHeaders({'token':localStorage.token})})
                  .pipe(
                    tap(()=>
                    {
                       this._refreshNeeded$.next();
                    }));
  }

  setLabelNotes(data:any){
    this.labelsNotes.next({notes:data});
  }

  getLabelNotes():Observable<any>{
    return this.labelsNotes.asObservable();
  }

private tempNoteId:number;
  setNoteIdd(noteid){
    this.tempNoteId=noteid;
  }

  getNoteIdd(){
    return this.tempNoteId;
  }
}

