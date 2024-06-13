import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users.service';


@Component({
  selector: 'app-usuario',
  styleUrls: ['./usuario.component.css'],
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  users: any[] = [];
  errorMessage: string = '';
  userToUpdate: any = {};
  modalTitle: string = 'Update User';

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      const token: any = this.getToken();
      const response = await this.userService.getAllUsers(token);
      if (response && response.statusCode === 200 && response.ourUsersList) {
        this.users = response.ourUsersList;
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
        const token: any = this.getToken();
        await this.userService.deleteUser(userId, token);
        // Refresh the user list after deletion
        this.loadUsers();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  openEditModal(user: any) {
    this.userToUpdate = { ...user };
    // Abre el modal usando jQuery (asegúrate de que jQuery esté disponible)
    $('#editUserModal').modal('show');
  }

  async updateUser() {
    try {
      const token: any = this.getToken();
      await this.userService.updateUSer(this.userToUpdate.id, this.userToUpdate, token);
      // Cerrar el modal después de actualizar
      $('#editUserModal').modal('hide');
      // Refresh the user list after update
      this.loadUsers();
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  private getToken(): string {
    // Implementa la lógica para obtener el token JWT, puede ser desde localStorage o sessionStorage
    // Ejemplo:
    return localStorage.getItem('jwt-token') || '';
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
