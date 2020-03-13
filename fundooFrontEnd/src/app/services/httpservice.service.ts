import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private _httpClient: HttpClient) { }

  public getRequest(url :any):any{
    return this._httpClient.get(url);
  }
  public postRequest(url :any, data: any ,headContent:any):Observable<any>{
    return this._httpClient.post(url,data,headContent);
  }
  public putRequest(url :any, data: any ,headContent:any ):any{
    return this._httpClient.put(url,data,headContent);
  }
  public deleteRequest(url :any):any{
    return this._httpClient.delete(url);
  }
}