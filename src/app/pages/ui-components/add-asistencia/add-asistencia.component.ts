import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-asistencia',
  templateUrl: './add-asistencia.component.html',
})
export class AddAsistenciaComponent implements OnInit {
  currentDate: string;
  currentTime: string;

  constructor() {
    this.currentDate = '';
    this.currentTime = '';
  }

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.currentDate = `${year}-${month}-${day}`;

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }
}
