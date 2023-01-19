import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';




export interface RootObject {}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url : string = environment.api_url;
  

  constructor(private http: HttpClient) { }

  createAccount(controller: string, model: any) {
    return this.http.post(`${this.url}/api/user/${controller}`, model);
  }


}
