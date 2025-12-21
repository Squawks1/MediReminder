import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false
})
export class CamaraPage {

  imagen: string = '';

  constructor(private navCtrl: NavController) {}

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl
    });

    this.imagen = foto.dataUrl!;
  }

  volverHome() {
    this.navCtrl.navigateRoot('/home');
  }

}
