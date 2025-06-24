import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { Actividad } from '../../../../../models/actividad/actividad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividad-listado',
  imports: [CommonModule],
  templateUrl: './actividad-listado.component.html',
  styleUrl: './actividad-listado.component.css',
})
export class ActividadListadoComponent {
  actividades: Array<Actividad>;
  constructor(private router: Router, private activateRouter: ActivatedRoute, private actividadService: ActividadService){
    this.actividades = new Array<Actividad>();
    this.getAtividad()
  }

  agregarActividad() {
    this.router.navigate(['register-actividad', '0']);
  }
  horarios:any
  getAtividad() {
    this.actividadService.consumirActividad().subscribe((result) => {
      console.log(result);
      result.forEach((element: any) => {
        let vactividad: Actividad = new Actividad();
        Object.assign(vactividad, element);
        vactividad.profesor = Array.isArray(element.profesor) ? element.profesor[0]:element.profesor;
        this.actividades.push(vactividad);
        vactividad = new Actividad();
      });
      
    });
  }
}
