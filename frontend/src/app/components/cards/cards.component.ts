import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  favorite: boolean = false;
  constructor(public AlertController: AlertController) {}

  ngOnInit() {}
  onClick() {
    this.favorite = !this.favorite;
    if (this.favorite) {
      this.AlertController.create({
        header: 'Adicionado aos favoritos',
        message: 'Este item foi adicionado aos seus favoritos.',
        buttons: ['OK'],
      }).then((alert) => alert.present());
    }
  }
}
