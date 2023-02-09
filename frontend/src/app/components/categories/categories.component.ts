import { Category } from './../../services/api/crud.service';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CategoryIdService } from '../../../shared.module';


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
    private router: Router,
    private navController: NavController,
    private route: ActivatedRoute,
    private categoryIdService: CategoryIdService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  async getId(id:any) {
    console.log('id', id);
    this.categoryIdService.setCategoryId(id);
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
