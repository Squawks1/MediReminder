import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-api-connect',
  templateUrl: './api-connect.page.html',
  standalone: false,
})
export class ApiConnectPage implements OnInit {

  posts: any[] = [];
  cargando = false;
  error = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.obtenerPosts();
  }

  obtenerPosts() {
    this.cargando = true;

    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.error = true;
        this.cargando = false;
      }
    });
  }
}
