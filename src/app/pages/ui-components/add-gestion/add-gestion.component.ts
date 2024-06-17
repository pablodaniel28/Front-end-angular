// add-gestion.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GestionesService } from 'src/app/gestiones.service';


@Component({
  selector: 'app-add-gestion',
  templateUrl: './add-gestion.component.html',
})
export class AddGestionComponent {

  gestionData = {
    nombre: ''
  };

  constructor(private gestionesService: GestionesService, private router: Router) { }

  onSubmit(): void {
    const token = localStorage.getItem('token') || '';

    this.gestionesService.createGestion(this.gestionData, token)
      .then((newGestion) => {
        console.log('Gestión creada correctamente:', newGestion);
        this.router.navigate(['/ui-components/gestiones']);
      })
      .catch(error => {
        console.error('Error al crear la gestión:', error);
        if (error.status === 403) {
          // Manejar el error 403 específicamente, por ejemplo, redirigiendo a una página de error o mostrando un mensaje al usuario
        } else {
          // Otros manejos de error
        }
      });
  }


}
