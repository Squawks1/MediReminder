import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router, private auth: AuthService) {}

  cerrarSesion() {
    console.log('Ha cerrado sesión');
    this.auth.logout();
    this.menu.close('mainMenu');
    this.router.navigate(['/login'])
  }

}
