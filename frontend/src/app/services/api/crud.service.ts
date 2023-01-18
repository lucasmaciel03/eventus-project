import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url : string = environment.api_url;

  constructor(private http: HttpClient) { }
}
