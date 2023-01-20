import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [ToolbarComponent];

@NgModule({
  imports: [IonicModule,
     CommonModule, 
     ReactiveFormsModule, 
     FormsModule
     ],
  declarations: components,
  exports: components,
})
export class ComponentsModule {}
