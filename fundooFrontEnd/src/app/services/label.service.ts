import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable ,Subject, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private httpContent={
    headers:new HttpHeaders({'content-type':'application/json'})
  };
  
   constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }
   //Url for retrieving Label Data
   private _getLabelsUrl:string='/assets/NoteData/label.json';
     
  getAllLabels():Observable<any>{
    // return this._httpService.get(`${environment.labelApiURL}/${environment.getAllLabels}`, {headers:new HttpHeaders({'token':localStorage.token})});
    return this._httpClient.get<any>(this._getLabelsUrl); 
  }

  createLabel(label):Observable<any>{
    return this._httpService.postRequest(`${environment.labelApiURL}/${environment.createLabel}`, {},{headers:new HttpHeaders({'token':localStorage.token})});
  }
  deleteLabel(label):Observable<any>{
    return this._httpService.putRequest(`${environment.labelApiURL}/${environment.deleteLabel}`, {},{headers:new HttpHeaders({'token':localStorage.token})}); 
  }
}
