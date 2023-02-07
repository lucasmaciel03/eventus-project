import { CardhistoryComponent } from './../components/cardhistory/cardhistory.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './../components/components.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    ComponentsModule,
  ],
  declarations: [Tab3Page, CardhistoryComponent],
})
export class Tab3PageModule {}
