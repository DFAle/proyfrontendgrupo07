import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent  {
  profesores: any[] = [];

  constructor(private actividadService: ActividadService) {}

  
}
