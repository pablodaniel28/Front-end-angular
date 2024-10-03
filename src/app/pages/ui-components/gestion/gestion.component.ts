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


  async deleteGestion(id: number): Promise<void> {
    const token = localStorage.getItem('token') || '';
    try {
      await this.gestionesService.deleteGestion(id, token);
      this.gestiones = this.gestiones.filter(gestion => gestion.id !== id);
      console.log('Gestión eliminada');
    } catch (error) {
      console.error('Error eliminando gestión:', error);
    }
  }

}
