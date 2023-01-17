import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomepagePageRoutingModule } from './welcomepage-routing.module';

import { WelcomepagePage } from './welcomepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomepagePageRoutingModule
  ],
  declarations: [WelcomepagePage]
})
export class WelcomepagePageModule {}
