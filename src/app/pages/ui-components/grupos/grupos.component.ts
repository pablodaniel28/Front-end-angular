import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { GruposService } from 'src/app/grupos.service';
import { Grupos } from 'src/app/models/grupos';
import 'jspdf-autotable';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
})
export class GruposComponent implements OnInit {
  grupos: Grupos[] = [];
  filteredGrupos: Grupos[] = [];
  searchTerm: string = '';

  constructor(private grupoService: GruposService) { }

  ngOnInit(): void {
    this.loadGrupos();
  }

  async loadGrupos() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.grupos = await this.grupoService.getAllGrupos(token);
      this.filteredGrupos = this.grupos;
      console.log('Grupos cargados:', this.grupos); // Muestra los grupos cargados en la consola
    } catch (error) {
      console.error('Error cargando grupos:', error); // Maneja los errores al cargar los grupos
    }
  }

  applyFilter() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredGrupos = this.grupos.filter(grupo =>
      grupo.nombre.toLowerCase().includes(searchTermLower) ||
      grupo.materia.nombre.toLowerCase().includes(searchTermLower) ||
      grupo.ourUsers.name.toLowerCase().includes(searchTermLower) ||
      grupo.gestion.nombre.toLowerCase().includes(searchTermLower) ||
      grupo.sistemaacademico.nombre.toLowerCase().includes(searchTermLower)
    );
  }

  imprimirPdf(): void {
    const doc = new jsPDF();
    doc.text('Lista de Grupos', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Nombre', 'Cupo', 'Carrera', 'Gestión', 'Materia', 'Docentes', 'Sistema Académico']],
      body: this.filteredGrupos.map(grupo => [
        grupo.id,
        grupo.nombre,
        grupo.cupo,
        grupo.carrera.nombre,
        grupo.gestion.nombre,
        grupo.materia.nombre,
        grupo.ourUsers.name,
        grupo.sistemaacademico.nombre
      ]),
      startY: 20,
    });
    doc.save('GruposLista.pdf');
  }

  exportToExcel(): void {
    const worksheet: WorkSheet = utils.json_to_sheet(this.filteredGrupos.map(grupo => ({
      Id: grupo.id,
      Nombre: grupo.nombre,
      Cupo: grupo.cupo,
      Carrera: grupo.carrera.nombre,
      Gestión: grupo.gestion.nombre,
      Materia: grupo.materia.nombre,
      Docentes: grupo.ourUsers.name,
      'Sistema Académico': grupo.sistemaacademico.nombre
    })));

    const workbook: WorkBook = {
      Sheets: { 'Grupos': worksheet },
      SheetNames: ['Grupos']
    };

    writeFile(workbook, 'GruposLista.xlsx');
  }

  async eliminarGrupo(id: number) {
    try {
      const token = localStorage.getItem('token') || '';
      await this.grupoService.deleteGrupo(id, token);
      console.log(`Grupo con id ${id} eliminado.`);
      this.loadGrupos(); // Vuelve a cargar los grupos después de eliminar
    } catch (error) {
      console.error(`Error eliminando grupo con id ${id}:`, error);
    }
  }
}
