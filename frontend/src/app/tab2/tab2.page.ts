import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  eventCategory = [
    { name: 'Todos', icon: 'apps', selected: false },
    { name: 'Música', icon: 'musical-notes', selected: false  },
    { name: 'Arte', icon: 'brush', selected: false  },
    { name: 'Cinema', icon: 'film', selected: false  },
    { name: 'Comida', icon: 'restaurant', selected: false  },
    { name: 'Religiosos', icon: 'church' , selected: false },
    { name: 'Dança', icon: 'people' , selected: false },
    { name: 'Ciências ', icon: 'flask' , selected: false },
    { name: 'Tecnologias ', icon: 'computer' , selected: false },
    { name: 'Culturais', icon: 'globe' , selected: false },
    { name: 'Literários', icon: 'book' , selected: false }, 
    { name: 'Desporto', icon: 'football' , selected: false },

  ];
 
  constructor() {}

  checkboxClicked(category: any) {
    category.selected = !category.selected;
    console.log('ola');
  }

  

  ngOnInit() {}
}
