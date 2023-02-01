import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventpagePageRoutingModule } from './eventpage-routing.module';
import { EventpagePage } from './eventpage.page';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EventpagePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventpagePageRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
})
export class EventpagePageModule {}
