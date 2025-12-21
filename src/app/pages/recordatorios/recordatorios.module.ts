import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordatoriosPageRoutingModule } from './recordatorios-routing.module';

import { RecordatoriosPage } from './recordatorios.page';

import { CompanyNameComponent } from 'src/app/components/company-name/company-name.component';
import { CompanyNameModule } from 'src/app/components/company-name/company-name.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordatoriosPageRoutingModule,
    CompanyNameModule
  ],
  declarations: [RecordatoriosPage]
})
export class RecordatoriosPageModule {}
