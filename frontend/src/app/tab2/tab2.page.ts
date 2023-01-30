import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { LocalizationService } from './../services/localization/localization.service';
import { Preferences } from '@capacitor/preferences';
import { Component, OnInit } from '@angular/core';

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
    private LocalizationService: LocalizationService
  ) {}

  checkboxClicked(category: any) {
    category.selected = !category.selected;
    console.log('ola');
  }

  ngOnInit() {}

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
}
