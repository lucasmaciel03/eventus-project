import { Event } from './../services/api/crud.service';
import { LocalizationService } from './../services/localization/localization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  event: any;
  favorite: boolean = false;
  constructor(
    private toastCtrl: ToastController,
    private navController: NavController,
    private router: Router,
    private toastController: ToastController,
    private translateService: TranslateService,
    private LocalizationService: LocalizationService,
    private route: ActivatedRoute,

  ) {}
  monthNames = ['JAN', 'FEV', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
//get event 


ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      this.event = JSON.parse(params['event']);
    });
    console.log(this.event)
  }


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

  async goBack() {
    this.navController.setDirection('back');
    await this.router.navigate(['/tabs/tab1'], {
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

  getFormattedDate(date: string) {
    let dateObj = new Date(date);
    let day = dateObj.getDate();
    let monthIndex = dateObj.getMonth();
    return `${day} ${this.monthNames[monthIndex]}`;
  }
  
}

