import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
  ) {
    this.navCtrl.navigateRoot('/register');
  }
}
