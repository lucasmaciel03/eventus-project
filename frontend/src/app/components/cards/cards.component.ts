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

  async goForward() {
    this.navController.setDirection('forward');
    await this.router.navigate(['/eventpage'], {
      replaceUrl: true,
    });
  }
}
