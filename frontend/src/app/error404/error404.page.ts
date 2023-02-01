import { LocalizationService } from './../services/localization/localization.service';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {
  constructor(
    private toastController: ToastController,
    private translateService: TranslateService,
    private LocalizationService: LocalizationService
  ) {}

  ngOnInit() {}

  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.LocalizationService.setLanguage(language);
    await this.showToast();
    console.log(language);
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('language as been changed'),
      duration: 4000,
    });
    await toast.present();
  }
}
