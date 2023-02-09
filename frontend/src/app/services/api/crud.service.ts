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
    comment: string;
}

export interface CommentWithUser {
  id: number;
  userId: number;
  eventId: number;
  comment: string;
  totalComments: number;
  user: {
    name: string;
    surname: string;
    username: string;
    profilePicture: string;
  };
}


export interface EventOrder {
  id: number;
  title: string;
  description: string;
  locationId: number;
  adress: string;
  startDate: string;
  endDate: string;
  image: string;
  categoryId: number;
  locationName: string;
  categoryName: string;
  user: {
    name: string;
    surname: string;
    username: string;
    profilePicture: string;
  };
  likes: number;
}

export interface EventResponse {
  eventsLikes: EventOrder[]
}

export interface CommentsResponse {
  commentsWithUser: CommentWithUser[];
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

  createEvent(controller: string, id:number, model: any) {
    return this.http.post(`${this.url}/api/event/${controller}/${id}`, model);
  }

  addLike(controller: string, id:number, eventId:number, model: any) {
    return this.http.post(`${this.url}/api/event/${controller}/${id}/${eventId}`, model);
  }

  createEventComment(controller: string, id:number, eventId:number, model: any) {
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

  getEventsOrderByLikes (controller: string) : Observable <EventResponse> {
    return this.http.get<EventResponse>(`${this.url}/api/event/${controller}`);
  }

  getEventsByUserIdAndCategoryId (controller: string, id: number, categoryId: number) : Observable <Event[]> {
    return this.http.get<Event[]>(`${this.url}/api/event/${controller}/${id}/${categoryId}`);
  }

  getEventComments(controller: string, id: number) : Observable<CommentsResponse> {
    return this.http.get<CommentsResponse>(`${this.url}/api/event/${controller}/${id}`);
  }

  // PUT
  updatePicture(controller: string, id: number, model: FormData) {
    //const formData = new FormData();
    //formData.append('file', file);
    //formData.append('data', JSON.stringify(model));
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model)
  }

  updateUsername(controller: string, id: number, model: any) {
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model, { responseType: 'text' })
  }

  updateUser(controller: string, id: number, model: any) {
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model, { responseType: 'text' })
  }

  updatePassword (controller: string, id: number, model: any){
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model, { responseType: 'text' })
  }

  //delete user by deleteUser controller
  deleteUser(controller: string, id: number, model: any) {
    return this.http.put(`${this.url}/api/user/${controller}/${id}`, model, { responseType: 'text' })
  }

  //delete event by deleteEvent controller
  deleteEvent(controller: string, id: number) {
    return this.http.delete(`${this.url}/api/event/${controller}/${id}`);
  }


}
