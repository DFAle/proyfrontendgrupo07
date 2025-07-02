import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Actividad } from '../../../models/actividad/actividad';
import { ActividadService } from '../../../services/actividad.service/actividad.service';
import { Profesores } from '../../../models/Profesores/profesores';
import { ProfesoresService } from '../../../services/serviceProfesores/profesores.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-actividad',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './form-actividad.component.html',
  styleUrl: './form-actividad.component.css',
})
export class FormActividadComponent implements OnInit {
  actividad: Actividad;
  accion: string = '';
  ArrayProfesores: Array<Profesores>;

  constructor(private router: Router, private activateRouter: ActivatedRoute, private servicioActividad: ActividadService, private sevicioProfesor: ProfesoresService,private domSanitizer: DomSanitizer ){
    this.actividad = new Actividad();
    this.actividad.horarios = [
      {
        dia: '',
        horaInicial: '',
        horaFinal: '',
      },
    ];
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
        this.CargarActividad(params['id']);
        console.log('Params:', params);
      }
    });
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

  CargarActividad(id: string) {
    this.servicioActividad.getActividadId(id).subscribe((result) => {
      this.actividad = Array.isArray(result) ? result[0] : result;
      // Convertir profesor a un único objeto si es array
    });
  }

  RegistrarActividad() {
    if (typeof this.actividad.profesor === 'object' && this.actividad.profesor._id) {
      this.actividad.profesor._id = this.actividad.profesor._id;
    }
    this.servicioActividad.addActividad(this.actividad).subscribe({
      next: (result) => {
        if (result.status == 1) {
          alert('se registro la  actividad: ');
        }
        console.log("Resultado:", result);
        this.router.navigate(['/admin/actividad-lista']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ActualizarActividad() {
    // Clona para evitar referencias directas
    const actividadAEnviar = structuredClone(this.actividad);

    // Verifica que tenga un _id
    if (!actividadAEnviar._id) {
      alert("No se puede actualizar: falta el ID de la actividad.");
      return;
    }

    this.servicioActividad.updateActividad(actividadAEnviar).subscribe({
      next: (result) => {
        if (result.status == 1) {
          alert('Se actualizó correctamente');
          this.router.navigate(['/admin/actividad-lista']);
        } else {
          alert('Error al actualizar: ' + (result.msg || 'Error desconocido'));
        }
      },
      error: (error) => {
        console.error("Error en updateActividad:", error);
        alert("Error al actualizar actividad: " + (error.error?.msg || error.message || 'Error desconocido'));
      }
    });
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.actividad.foto = base64;
    };
    reader.readAsDataURL(file);
  }
}



}
