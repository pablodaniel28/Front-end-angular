import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  hidden = false;
  token: any;
  profileInfo: any;
  errorMessage: string = '';
  users: any[] = []; // Lista para almacenar los usuarios
  originalUsers: any[] = []; // Copia de seguridad de todos los usuarios
  searchTerm: string = ''; // Término de búsqueda

  constructor(private readonly userService: UsersService, private readonly router: Router) {}

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No Token Found");
      }
      this.token = token; // Guardar el token para uso posterior
      this.profileInfo = await this.userService.getYourProfile(token);
      await this.loadUsers(); // Cargar los usuarios después de obtener el perfil
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async loadUsers() {
    try {
      const response = await this.userService.getAllUsers(this.token);
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.users = response.ourUsersList;
        this.originalUsers = [...this.users]; // Hacer una copia de seguridad de todos los usuarios
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async deleteUser(userId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await this.userService.deleteUser(userId, this.token);
        if (response && response.statusCode === 200) {
          this.users = this.users.filter(user => user.id !== userId); // Actualizar la lista de usuarios
          this.originalUsers = [...this.users]; // Actualizar la copia de seguridad
        } else {
          this.showError('Failed to delete user.');
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  applyFilters() {
    const searchTermLower = this.searchTerm.toLowerCase();
    if (!searchTermLower) {
      this.users = [...this.originalUsers]; // Si el término de búsqueda está vacío, restaurar la lista original
    } else {
      this.users = this.originalUsers.filter(user =>
        user.name.toLowerCase().includes(searchTermLower) ||
        user.role.toLowerCase().includes(searchTermLower)
      );
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
