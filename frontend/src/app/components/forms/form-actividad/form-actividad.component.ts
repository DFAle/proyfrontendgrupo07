import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Actividad } from '../../../models/actividad/actividad';
import { ActividadService } from '../../../services/actividad.service/actividad.service';

@Component({
  selector: 'app-form-actividad',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form-actividad.component.html',
  styleUrl: './form-actividad.component.css'
})
export class FormActividadComponent {
  actividad: Actividad;
  accion: string = '';
  constructor(private router:Router,private activateRouter:ActivatedRoute ,private servicioActividad:ActividadService){
    this.actividad = new Actividad();

  }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      // const id = +params['_id'];
      if (params['id'] == 0) {
        //this.accion = 'new';
      } else {
        this.accion = 'update';
        //this.CargarFormulario(params['id']);
      }
    });
  }
  RegistrarActividad() {
    this.servicioActividad.addActividad(this.actividad).subscribe((result) => {
      console.log(result);
      if (result.status == 1) {
        alert('se agrego correctamente');
        this.router.navigate(['/admin/actividad-listado']);
      }
    });
  }
}
