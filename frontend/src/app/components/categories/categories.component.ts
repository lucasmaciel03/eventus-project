import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  eventCategories = [
    { name: 'All', icon: 'apps' },
    { name: 'Music', icon: 'musical-notes' },
    { name: 'Art', icon: 'brush' },
    { name: 'Theater', icon: 'film' },
    { name: 'Food', icon: 'restaurant' },
    { name: 'Religious', icon: 'church' },
    { name: 'Dance', icon: 'people' },
    { name: 'Science ', icon: 'flask' },
    { name: 'Technologies ', icon: 'computer' },
    { name: 'Culture', icon: 'globe' },
    { name: 'Literay', icon: 'book' },
    { name: 'Sport', icon: 'football' },
  ];

  opts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
  };

  constructor() {}

  ngOnInit() {}

  onButtonClick() {
    console.log('funciona');
  }
}
