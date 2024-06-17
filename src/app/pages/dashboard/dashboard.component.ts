import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class AppDashboardComponent implements OnInit {
  isAdmin: boolean = false; // Variable para controlar si el usuario es administrador

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.checkUserRole(); // Al inicializar el componente, verificamos el rol del usuario
  }

  async checkUserRole() {
    this.isAdmin = this.userService.isAdmin(); // Utilizamos el método del servicio para verificar si es administrador
  }

}
