import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false
})
export class CamaraPage {

  imagen: string = '';

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.DataUrl
    });

    this.imagen = foto.dataUrl!;
  }

}
