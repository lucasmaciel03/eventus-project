import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventpagePage } from './eventpage.page';

const routes: Routes = [
  {
    path: '',
    component: EventpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventpagePageRoutingModule {}
