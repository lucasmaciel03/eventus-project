import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.page.html',
  styleUrls: ['./eventpage.page.scss'],
})
export class EventpagePage implements OnInit {
  favorite: boolean = false;
  constructor(
    private toastCtrl: ToastController,
    private navController: NavController,
    private router: Router
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

  async goBack() {
    this.navController.setDirection('back');
    await this.router.navigate(['/tabs/tab1'], {
      replaceUrl: true,
    });
  }
}
