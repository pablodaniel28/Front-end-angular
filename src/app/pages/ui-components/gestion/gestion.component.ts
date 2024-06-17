import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionesService } from 'src/app/gestiones.service';
import { Gestiones } from 'src/app/models/gestiones';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
})
export class GestionComponent implements OnInit {

  gestiones: Gestiones[] = [];

  constructor(private gestionesService: GestionesService, private router: Router) { }

  ngOnInit(): void {
    this.loadGestiones();
  }

  loadGestiones(): void {
    const token = localStorage.getItem('token') || '';
   this.gestionesService.getAllGestiones(token).then(
      (data: Gestiones[]) => {
       this.gestiones = data;
        },
        (error) => {
          console.error('Error loading gestiones:', error);
       }
    );
  }

  editarGestion(id: number): void {
    this.router.navigate(['/ui-components/editgestion', id]);
  }

  // async eliminarGestion(id: number) {
  //   try {
  //     const token = ''; // Obtén el token de autenticación según tu implementación
  //     await this.gestionesService.deleteGestion(id, token);
  //     this.gestiones = this.gestiones.filter(gestion => gestion.id !== id);
  //     console.log(`Gestión ${id} eliminada correctamente`);
  //   } catch (error) {
  //     console.error(`Error al eliminar la gestión ${id}:`, error); // Maneja los errores al eliminar la gestión
  //   }
  // }

}
