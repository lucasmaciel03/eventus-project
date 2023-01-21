import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  eventCategories = [
    { name: 'Todos', icon: 'apps' },
    { name: 'Música', icon: 'musical-notes' },
    { name: 'Arte', icon: 'brush' },
    { name: 'Cinema', icon: 'film' },
    { name: 'Comida', icon: 'restaurant' },
    { name: 'Religiosos', icon: 'church' },
    { name: 'Dança', icon: 'people' },
    { name: 'Ciências ', icon: 'flask' },
    { name: 'Tecnologias ', icon: 'computer' },
    { name: 'Culturais', icon: 'globe' },
    { name: 'Literários', icon: 'book' },
    { name: 'Desporto', icon: 'football' },
  ];

  opts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
  };

  constructor() {}

  ngOnInit() {}
}
