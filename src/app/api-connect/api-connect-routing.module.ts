import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiConnectPage } from './api-connect.page';

const routes: Routes = [
  {
    path: '',
    component: ApiConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiConnectPageRoutingModule {}
