import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  profilePicture: string;
  locationName: string;
  birthDate: string;
  joinedDate: Date;
}

export interface Location {
  id: number;
  description: string;
}




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

  getUser(controller: string, id: number) : Observable <User> {
    return this.http.get<User>(`${this.url}/api/user/${controller}/${id}`);
  }

  updatePicture(controller: string, id: number, model: FormData) {
    //const formData = new FormData();
    //formData.append('file', file);
    //formData.append('data', JSON.stringify(model));
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model)
  }

  updateUser(controller: string, id: number, model: any) {
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model, { responseType: 'text' })
  }

  getLocations(controller: string) : Observable <Location[]> {
    return this.http.get<Location[]>(`${this.url}/api/location/${controller}`);
  }
}
