import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthGuard } from 'src/app/guards/auth-guard';
import { Dbservice } from 'src/app/services/dbservice';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private dbservice: Dbservice,
    private auth: AuthService
  ) {
    // Formulario reactivo y sus validaciones
    this.loginForm = this.fb.group({
      usuario: [
        '',
        [
          Validators.required,
          // 3 a 8 caracteres alfanuméricos
          Validators.pattern(/^[a-zA-Z0-9]{3,8}$/) 
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          // Contraseña de 4 números
          Validators.pattern(/^\d{4}$/) 
        ]
      ]
    });
  }

  // Mostrar alertas
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Función login
  login() {
    // En caso de ingresar mal un dato
    if (this.loginForm.invalid) {
      this.mostrarAlerta('Por favor, verifique los campos ingresados.');
      return;
    }

    const { usuario, password } = this.loginForm.value;

    // Validar usuario en la BD
    this.dbservice.validarUsuario(usuario, password).then((usuarioEncontrado) => {

      if (!usuarioEncontrado) {
        this.mostrarAlerta('Usuario o contraseña incorrectos.');
        return;
      }

      this.auth.login(usuarioEncontrado.id);

      // Cuando se autentifique, pasará a /home
      this.router.navigate(['/home'], { state: { user: usuarioEncontrado.nombre } });

    });
  }


  // Función para llevar a la página registro
  registro() {
    this.router.navigate(['/registro']);
  }


}
