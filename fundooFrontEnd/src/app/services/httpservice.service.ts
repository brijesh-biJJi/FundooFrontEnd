import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  private _refreshNeeded$= new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  constructor(private _httpClient: HttpClient) { }

  public getRequest(url :any):any{
    return this._httpClient.get(url);
  }
  public get(url :any,headContent:any):any{
    return this._httpClient.get(url,headContent);
  }
  

  public postRequest(url :any, data: any ,headContent:any):Observable<any>{
    return this._httpClient
            .post(url,data,headContent)
            .pipe(
              tap(()=>{
                this._refreshNeeded$.next();
              })  
            );
  }
  public putRequest(url :any, data: any ,headContent:any ):any{
    return this._httpClient
            .put(url,data,headContent)
            .pipe(
              tap(()=>{
                this._refreshNeeded$.next();
              })  
            );
  }
  public deleteRequest(url :any):any{
    return this._httpClient.delete(url);
  }
}