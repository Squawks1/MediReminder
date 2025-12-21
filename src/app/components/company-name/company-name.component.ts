import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.component.html',
  styleUrls: ['./company-name.component.scss'],
  standalone: false,
})
export class CompanyNameComponent {
  @Input() companyName: string = "MediReminder";
}
