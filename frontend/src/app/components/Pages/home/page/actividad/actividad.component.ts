import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';

declare var bootstrap: any;

@Component({
  selector: 'app-actividad',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
})
export class ActividadComponent {
  actividades = Array<Actividad>();
  constructor(private actividadService: ActividadService) {
    this.actividades = new Array<Actividad>();
    this.getAtividad();
  }

  getAtividad() {
    this.actividadService.consumirActividad().subscribe((result) => {
      result.forEach((element: any) => {
        let vactividad: Actividad = new Actividad();
        Object.assign(vactividad, element);
        vactividad.profesor = Array.isArray(element.profesor)? element.profesor[0]: element.profesor;
        vactividad.horarios = Array.isArray(element.horarios)? element.horarios: [];
        this.actividades.push(vactividad);
      });
    });
  }
}
