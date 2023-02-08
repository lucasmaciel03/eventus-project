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

export interface Category {
  id: number;
  image: string;
  description: string;
}

// "id": 1,
// "title": "Elas à quarta",
// "description": "Top",
// "locationId": 206,
// "adress": "Rua Doutro Alfredo",
// "startDate": "2023-05-17T00:00:00.000Z",
// "endDate": "2023-05-17T00:00:00.000Z",
// "image": "default.png",
// "categoryId": 2,
// "locationName": "Porto",
// "categoryName": "Music"

export interface Event {
    id:number;
    title:string;
    description:string;
    locationName:string;
    adress:string;
    startDate:Date;
    endDate:Date;
    image: string;
    categoryName:string;
    name:string;
    surname:string;
    username:string;
    profilePicture:string;
}

export interface RootObject {}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url : string = environment.api_url;
  

  constructor(private http: HttpClient) { }

  // POST

  createAccount(controller: string, model: any) {
    return this.http.post(`${this.url}/api/user/${controller}`, model);
  }

  createEvent(controller: string, id:number, model: any) {
    return this.http.post(`${this.url}/api/event/${controller}/${id}`, model);
  }

  addLike(controller: string, id:number, eventId:number, model: any) {
    return this.http.post(`${this.url}/api/event/${controller}/${id}/${eventId}`, model);
  }

  // GET
  getUser(controller: string, id: number) : Observable <User> {
    return this.http.get<User>(`${this.url}/api/user/${controller}/${id}`);
  }
  getLocations(controller: string) : Observable <Location[]> {
    return this.http.get<Location[]>(`${this.url}/api/location/${controller}`);
  }

  getCategories(controller: string) : Observable <Category[]> {
    return this.http.get<Category[]>(`${this.url}/api/category/${controller}`);
  }

  getEvents(controller: string) : Observable <Event[]> {
    return this.http.get<Event[]>(`${this.url}/api/event/${controller}`);
  }

  getLikedEvents(controller: string, id: number) : Observable <Event[]> {
    return this.http.get<Event[]>(`${this.url}/api/user/${controller}/${id}`);
  }

  getEventsByUserId(controller: string, id: number) : Observable <Event[]> {
    return this.http.get<Event[]>(`${this.url}/api/event/${controller}/${id}`);
  }

  // PUT
  updatePicture(controller: string, id: number, model: FormData) {
    //const formData = new FormData();
    //formData.append('file', file);
    //formData.append('data', JSON.stringify(model));
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model)
  }

  updateUser(controller: string, id: number, model: any) {
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model, { responseType: 'text' })
  }

  // DELETE


}
