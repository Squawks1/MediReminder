import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { ApiService } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit{
  usuarioEmail: string = 'Invitado';
  MediReminder: string = 'MediReminder';

  // Variable para guardar respuesta de la API
  posts: any[] = [];

  constructor(private router: Router, private menu: MenuController, private api: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    //Validación para entrar con un usuario o invitado
    this.usuarioEmail = navigation?.extras.state?.['user'] || 'Invitado';
  }

  // Cerrar el menú lateral
  ngOnInit(): void {
    this.menu.close("mainMenu");

    // Llamar a la API
    this.obtenerPosts();
  }

  // Función para consumir la API
  obtenerPosts() {
    this.api.getPosts().subscribe({
      next: (response: any) => {
        console.log("Datos recibidos:", response);
        this.posts = response;
      },
      error: (error) => {
        console.error("Error al consumir API:", error);
      }
    });
  }
}
