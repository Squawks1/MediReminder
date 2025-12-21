import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicamentosPageRoutingModule } from './medicamentos-routing.module';

import { MedicamentosPage } from './medicamentos.page';

import { CompanyNameComponent } from 'src/app/components/company-name/company-name.component';
import { CompanyNameModule } from 'src/app/components/company-name/company-name.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicamentosPageRoutingModule,
    CompanyNameModule
  ],
  declarations: [MedicamentosPage]
})
export class MedicamentosPageModule {}
