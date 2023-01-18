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
    { name: 'Gastronómicos', icon: 'restaurant' },
    { name: 'Religiosos', icon: 'church' },
    { name: 'Dança', icon: 'people' },
    { name: 'Culturais', icon: 'globe' },
    { name: 'Literários', icon: 'book' },
    { name: 'Ciências e Tecnologia', icon: 'flask' },
    { name: 'Desporto', icon: 'football' },
  ];

  goToEvents() {
    console.log(`Você clicou na categoria de eventos`);
  }
  constructor() {}

  ngOnInit() {}
}
