import { Component, OnInit } from '@angular/core';
import { LicenciaService } from 'src/app/licencia.service';
import { Licencia } from 'src/app/models/licencia';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-licencia',
  templateUrl: './licencia.component.html',
})
export class LicenciaComponent implements OnInit {
  lic: Licencia[] = [];
  filteredLic: Licencia[] = [];
  fechaInicio!: string;
  fechaFin!: string;

  constructor(private licenciaService: LicenciaService) { }

  ngOnInit(): void {
    this.loadLicencia();
  }

  async loadLicencia() {
    try {
      const token = localStorage.getItem('token') || ''; // Obtén el token desde el localStorage
      this.lic = await this.licenciaService.getAllLicencia(token);
      this.filteredLic = this.lic;
      console.log('Licencias cargadas:', this.lic); // Muestra las licencias cargadas en la consola
    } catch (error) {
      console.error('Error cargando licencias:', error); // Maneja los errores al cargar las licencias
    }
  }

  applyFilter() {
    const inicio = new Date(this.fechaInicio);
    const fin = new Date(this.fechaFin);

    this.filteredLic = this.lic.filter(licencia => {
      const fechaLicencia = new Date(licencia.fecha);
      return (!this.fechaInicio || fechaLicencia >= inicio) &&
             (!this.fechaFin || fechaLicencia <= fin);
    });
  }

  imprimirPdf(): void {
    const doc = new jsPDF();
    doc.text('Lista de Licencias', 10, 10);
    (doc as any).autoTable({
      head: [['Id', 'Descripción', 'Hora', 'Fecha', 'Grupo', 'Usuario']],
      body: this.filteredLic.map(licencia => [
        licencia.id,
        licencia.descripcion,
        licencia.hora,
        licencia.fecha,
        licencia.grupo.nombre,
        licencia.ourUsers.name
      ]),
      startY: 20,
    });
    doc.save('LicenciasLista.pdf');
  }

  exportToExcel(): void {
    const worksheet: WorkSheet = utils.json_to_sheet(this.filteredLic.map(licencia => ({
      Id: licencia.id,
      Descripción: licencia.descripcion,
      Hora: licencia.hora,
      Fecha: licencia.fecha,
      Grupo: licencia.grupo.nombre,
      Usuario: licencia.ourUsers.name
    })));

    const workbook: WorkBook = {
      Sheets: { 'Licencias': worksheet },
      SheetNames: ['Licencias']
    };

    writeFile(workbook, 'LicenciasLista.xlsx');
  }
}
