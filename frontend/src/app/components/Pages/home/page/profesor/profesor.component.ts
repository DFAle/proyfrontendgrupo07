import { Component, OnInit } from '@angular/core';
import { Actividad, ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  profesores: any[] = [];

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.actividadService.getActividades().subscribe({
      next: (actividades) => {
       const profesoresMap = new Map<string, any>();

actividades.forEach(act => {
  if (act.profesor && act.profesor.length > 0) {
    act.profesor.forEach((prof: any) => {
      if (prof.correo && !profesoresMap.has(prof.correo)) {
        profesoresMap.set(prof.correo, prof);
      }
    });
  }
});

this.profesores = Array.from(profesoresMap.values());


      },
      error: (err) => {
        console.error('Error al cargar actividades:', err);
      }
    });
  }
}
