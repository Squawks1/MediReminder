import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY = 'usuarioLogeado';

  constructor() { }

  // Dejar al usuario como logeado
  login(usuarioId: number) {
    localStorage.setItem(this.KEY, usuarioId.toString());
  }

  // Cerrar la sesión
  logout() {
    localStorage.removeItem(this.KEY);
  }

  // Ver si el usuario sigue conectado
  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) !== null;
  }

  // Obtener ID de usuario
  getUserId(): number | null {
    const id = localStorage.getItem(this.KEY);
    return id ? Number(id) : null;
  }
}
