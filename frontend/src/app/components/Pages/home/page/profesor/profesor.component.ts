import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { CommonModule } from '@angular/common';
import { Actividad } from '../../../../../models/actividad/actividad';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { routes } from '../../../../../app.routes';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
})
export class ProfesorComponent {
  actividades: Array<Actividad>;

  constructor(private actividadService: ActividadService, private profesorService: ProfesoresService) {
    this.actividades = new Array<Actividad>();
    this.getAtividad();
    this.getProfesores();
  }
  getAtividad() {
    this.actividadService.consumirActividad().subscribe(
      (result) => {
        result.forEach((element: any) => {
          let actividad = new Actividad();
          Object.assign(actividad, element);
          if (Array.isArray(element.profesor)) {
            actividad.profesor = element.profesor[0];
          }
          actividad.horarios = Array.isArray(element.horarios) ? element.horarios : [];
          this.actividades.push(actividad);
        });
      });
  }
  ArrayProfesores: Array<any> = [];
  getProfesores () {
    this.profesorService.getProfesores().subscribe(
      (result) => {
        this.ArrayProfesores=(result);
      });
  }
}
