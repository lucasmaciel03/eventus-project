import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {}
  async ngOnInit() {
    await this.initializeApp();
  }
  async initializeApp() {
    await this.platform.ready();
  }
}
