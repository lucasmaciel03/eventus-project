import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryIdService {
  private categoryId = new Subject<number>();
  categoryId$ = this.categoryId.asObservable();

  constructor() { }

  setCategoryId(id: number) {
    this.categoryId.next(id);
  }
}
