import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
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
