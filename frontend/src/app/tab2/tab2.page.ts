import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { LocalizationService } from './../services/localization/localization.service';
import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/api/crud.service';
import { EventResponse } from 'src/app/services/api/crud.service';
import { EventOrder } from 'src/app/services/api/crud.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  eventCategory = [
    { name: 'Todos', icon: 'apps', selected: false },
    { name: 'Música', icon: 'musical-notes', selected: false },
    { name: 'Arte', icon: 'brush', selected: false },
    { name: 'Cinema', icon: 'film', selected: false },
    { name: 'Comida', icon: 'restaurant', selected: false },
    { name: 'Religiosos', icon: 'church', selected: false },
    { name: 'Dança', icon: 'people', selected: false },
    { name: 'Ciências ', icon: 'flask', selected: false },
    { name: 'Tecnologias ', icon: 'computer', selected: false },
    { name: 'Culturais', icon: 'globe', selected: false },
    { name: 'Literários', icon: 'book', selected: false },
    { name: 'Desporto', icon: 'football', selected: false },
  ];

  

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private LocalizationService: LocalizationService,
    private crudService: CrudService,
    private router: Router,
    private navController: NavController
    
  ) {}

  events: EventOrder[] = [];


  checkboxClicked(category: any) {
    category.selected = !category.selected;
    console.log('ola');
  }

  ngOnInit() {
    this.getEventsOrderByLikes();
  }

  async goForward(event:any) {
    this.navController.setDirection('forward');
    this.router.navigate(['/eventpage'], { queryParams: { event: JSON.stringify(event) } });
    console.log(event)
  }

  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.LocalizationService.setLanguage(language);
    await this.showToast();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('language as been changed'),
      duration: 4000,
    });
    await toast.present();
  }


  getEventsOrderByLikes = async () => {
    this.crudService.getEventsOrderByLikes('getEventsOrderByLikes', ).subscribe(
      (data: EventResponse) => {
        this.events = [];
        this.events.push(...data.eventsLikes);
        console.log('*********************************'+this.events);
        this.events.forEach((event) => {
          event.image = `http://localhost:4243/uploads/events/${event.image}`;
        }
        );
      }
    );
  }
}
