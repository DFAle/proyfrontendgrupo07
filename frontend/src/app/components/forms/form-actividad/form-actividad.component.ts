import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Actividad } from '../../../models/actividad/actividad';
import { ActividadService } from '../../../services/actividad.service/actividad.service';
import { Profesores } from '../../../models/Profesores/profesores';
import { ProfesoresService } from '../../../services/serviceProfesores/profesores.service';

@Component({
  selector: 'app-form-actividad',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form-actividad.component.html',
  styleUrl: './form-actividad.component.css'
})
export class FormActividadComponent {
  actividad: Actividad;
  accion: string = '';
  ArrayProfesores: Array<Profesores>;

  constructor(private router:Router,private activateRouter:ActivatedRoute ,private servicioActividad:ActividadService,private sevicioProfesor:ProfesoresService){
    this.actividad = new Actividad();
    this.actividad.horarios = [{
      dia: '',
      horaInicial: '',
      horaFinal: ''
    }];
    this.ArrayProfesores = new Array<Profesores>();
    this.CargarProfesor();
  }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      // const id = +params['_id'];
      if (params['id'] == 0) {
        this.accion = 'new';
      } else {
        this.accion = 'update';
        //this.CargarFormulario(params['id']);
      }
    });
    this.CargarProfesor();
  }
    CargarProfesor() {
     this.ArrayProfesores = new Array<Profesores>();
      this.sevicioProfesor.getProfesores().subscribe((result) => {
        console.log('lsitado de roles', result);
        result.forEach((element: any) => {
          let vprofesor: Profesores = new Profesores();
          Object.assign(vprofesor, element);
          this.ArrayProfesores.push(element);
          vprofesor = new Profesores();
        });
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
