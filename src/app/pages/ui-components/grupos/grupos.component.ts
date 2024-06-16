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

  constructor(private grupoService: GruposService) { }

  ngOnInit(): void {
    this.loadGrupos();
  }

  async loadGrupos() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.grupos = await this.grupoService.getAllGrupos(token);
      console.log('Grupos cargados:', this.grupos); // Muestra los grupos cargados en la consola
    } catch (error) {
      console.error('Error cargando grupos:', error); // Maneja los errores al cargar los grupos
    }
  }


  imprimirPdf(): void {
    const doc = new jsPDF();
    doc.text('Lista de Grupos', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Nombre', 'Cupo', 'Carrera', 'Gestión', 'Materia', 'Docentes', 'Sistema Académico']],
      body: this.grupos.map(grupo => [
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
    const worksheet: WorkSheet = utils.json_to_sheet(this.grupos.map(grupo => ({
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
}
