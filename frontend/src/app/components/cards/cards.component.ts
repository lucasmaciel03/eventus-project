import { Preferences } from '@capacitor/preferences';
import { LocalizationService } from './../../services/localization/localization.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  favorite: boolean = false;
  constructor(
    private toastCtrl: ToastController,
    private toastController: ToastController,
    private navController: NavController,
    private router: Router,
    private translateService: TranslateService,
    private LocalizationService: LocalizationService
  ) {}

  ngOnInit() {}

  async presentToast() {
    this.favorite = !this.favorite;
    let message = this.favorite
      ? 'Adicionado aos favoritos'
      : 'Removido dos favoritos';
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'primary',
    });

    toast.present();
  }

  async goForward() {
    this.navController.setDirection('forward');
    await this.router.navigate(['/eventpage'], {
      replaceUrl: true,
    });
  }

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
