import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {HttpserviceService} from 'src/app/services/httpservice.service';
import { Observable ,Subject, BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService 
{

  private userApiUrl=environment.userApiUrl;

  private _refreshNeeded$= new Subject<any>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  private httpContent={
    headers:new HttpHeaders({'content-type':'application/json'})
  };
  
   constructor(private _httpClient:HttpClient,private _httpService:HttpserviceService) { }
   
   registerUser(userDetails:any):Observable<any>
   {
        console.log("User Email",userDetails.email);
        return this._httpService.postRequest(this.userApiUrl+environment.registerUrl,userDetails,this.httpContent);
   }
 
   loginUser(loginDetails:any):Observable<any>
  {
    console.log("calling to.."+`${this.userApiUrl}/${environment.loginURL}`);
    return this._httpService.postRequest(this.userApiUrl+environment.loginURL,loginDetails,this.httpContent);
  }

  forgotPasswordVerifyMail(forgotPassDetails:any):Observable<any>
  {
    console.log("calling to.."+this.userApiUrl+environment.forgotPasswordUrl);
    return this._httpService.postRequest(this.userApiUrl+environment.forgotPasswordUrl,forgotPassDetails,this.httpContent);
  }

  changePassword(changePassDetails:any):Observable<any>                                                                                                                                                                                                                                                                                               
  {
    console.log('hi token '+localStorage.token)
    console.log('URL check '+this.userApiUrl+environment.changePasswordUrl);
    console.log('Details '+changePassDetails.password);
    return this._httpService.putRequest(this.userApiUrl+environment.changePasswordUrl,changePassDetails,{headers:new HttpHeaders({'token':localStorage.token})});
    
  }
 
  getCollaboratorsList(noteId):Observable<any>{

    return this._httpService.get(`${environment.userApiUrl}/${environment.collaborator}/${noteId}`,{headers:new HttpHeaders({'token':localStorage.token})});
  }
  
  addCollab(email,noteId):Observable<any>{
    return this._httpService
               .postRequest(`${environment.userApiUrl}/${environment.addCollab}/${email}/${noteId}`," ",{headers:new HttpHeaders({'token':localStorage.token})})
               .pipe(
                tap(()=>
                {
                   this._refreshNeeded$.next();
                }));
  }
  
  removeCollab(email,noteId):Observable<any>{
    return this._httpService
               .putRequest(`${environment.userApiUrl}/${environment.removeCollab}/${email}/${noteId}`," ",{headers:new HttpHeaders({'token':localStorage.token})})
               .pipe(
                tap(()=>
                {
                   this._refreshNeeded$.next();
                }));
  }
  
}
