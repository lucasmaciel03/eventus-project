import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {}

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: 'Adicionado aos favoritos',
      duration: 1500,
      position: 'top',
      color: 'primary',
    });

    toast.present();
  }
}
