import { ComponentsModule } from './../components/components.module';

import { CardsComponent } from './../components/cards/cards.component';
import { CategoriesComponent } from './../components/categories/categories.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    Tab1Page,
    CategoriesComponent,
    CardsComponent,
    
  ],
})
export class Tab1PageModule {}
