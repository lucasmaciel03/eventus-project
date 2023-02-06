import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];


  opts = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0,
  };

  constructor(
    private crudService: CrudService,
  ) {}

  ngOnInit() {
    this.getCategories();
  }



  getCategories() {
    this.crudService.getCategories('getCategories').subscribe((data) => {
      this.categories = data;
      this.categories.forEach(category => {
        category.image = `http://localhost:4243/uploads/categories/${category.image}`;
      });
    });
  }

}
