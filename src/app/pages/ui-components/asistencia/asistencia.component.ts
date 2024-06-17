import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { AsistenciasService } from 'src/app/asistencias.service';
import { Asistencia } from 'src/app/models/asistencias';
import 'jspdf-autotable';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit {
  asistencia: Asistencia[] = [];
  filteredAsistencia: Asistencia[] = [];
  fechaInicio: string = '';
  fechaFin: string = '';
  searchTerm: string = '';

  constructor(private asistenciaService: AsistenciasService) { }

  ngOnInit(): void {
    this.loadAsistencia();
  }

  async loadAsistencia() {
    try {
      const token = localStorage.getItem('token') || '';
      this.asistencia = await this.asistenciaService.getAllAsistencia(token);
      this.filteredAsistencia = this.asistencia;
      console.log('Asistencias cargadas:', this.asistencia);
    } catch (error) {
      console.error('Error cargando asistencias:', error);
    }
  }

  applyFilter() {
    let filtered = this.asistencia;

    if (this.fechaInicio && this.fechaFin) {
      const startDate = new Date(this.fechaInicio);
      const endDate = new Date(this.fechaFin);
      filtered = filtered.filter(a => {
        const asistenciaDate = new Date(a.fecha);
        return asistenciaDate >= startDate && asistenciaDate <= endDate;
      });
    }

    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(a =>
        a.grupo.materia.nombre.toLowerCase().includes(searchTermLower) ||
        a.grupo.nombre.toLowerCase().includes(searchTermLower) ||
        a.descripcion.toLowerCase().includes(searchTermLower)
      );
    }

    this.filteredAsistencia = filtered;
  }

  imprimirPdf(): void {
    const doc = new jsPDF();
    doc.text('Lista de Asistencias', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Materia', 'Grupo', 'Hr Est', 'Fecha', 'Hr Llegada', 'Tiempo', 'Descripcion']],
      body: this.filteredAsistencia.map(a => [
        a.id,
        a.grupo.materia.nombre,
        a.grupo.nombre,
        '7:00', // Assuming Hr Est is a constant value
        a.fecha,
        a.hora,
        a.tiempo,
        a.descripcion
      ]),
      startY: 20,
    });
    doc.save('AsistenciasLista.pdf');
  }

  exportToExcel(): void {
    const worksheet: WorkSheet = utils.json_to_sheet(this.filteredAsistencia.map(a => ({
      Id: a.id,
      Materia: a.grupo.materia.nombre,
      Grupo: a.grupo.nombre,
      HrEst: '7:00', // Assuming Hr Est is a constant value
      Fecha: a.fecha,
      HrLlegada: a.hora,
      Tiempo: a.tiempo,
      Descripcion: a.descripcion
    })));

    const workbook: WorkBook = {
      Sheets: { 'Asistencias': worksheet },
      SheetNames: ['Asistencias']
    };

    writeFile(workbook, 'AsistenciasLista.xlsx');
  }
}
