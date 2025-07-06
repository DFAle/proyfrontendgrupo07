import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { Profesores } from '../../../../../models/Profesores/profesores';
import { Router } from '@angular/router';
import printJS from 'print-js';

@Component({
  selector: 'app-profesor-listado',
  imports: [CommonModule],
  templateUrl: './profesor-listado.component.html',
  styleUrl: './profesor-listado.component.css'
})
export class ProfesorListadoComponent {
  ArrayProfesores: Array<Profesores>;

  constructor(private servicioProfesor: ProfesoresService, private router: Router) {
    this.ArrayProfesores = new Array<Profesores>();
    this.getProfe();
  }

  getProfe() {
    this.servicioProfesor.getProfesores().subscribe(
      result => {
        console.log("Datos recibidos del servicio de profesores:", result);
        this.ArrayProfesores = [];
        result.forEach((element: any) => {
          let vprofe: Profesores = new Profesores();
          Object.assign(vprofe, element);
          this.ArrayProfesores.push(vprofe);
        });
        console.log("ArrayProfesores después de cargar:", this.ArrayProfesores);
      },
      error => {
        console.error("Error al cargar profesores desde el servicio:", error);
      }
    );
  }

  agregarProfesor() {
    this.router.navigate(['/admin/register-profesor', '0']);
  }

  editarProfesor(profesor: Profesores) {
    this.router.navigate(['/admin/register-profesor', profesor._id]);
  }

  eliminarProfesor(profesor: Profesores) {
    const confirmar = confirm(`¿Seguro que deseas eliminar a ${profesor.nombre} ${profesor.apellido}?`);
    if (confirmar && profesor._id) {
      this.servicioProfesor.deleteProfesor(profesor._id).subscribe(
        (result) => {
          if (result.status === "1") {
            alert("Profesor eliminado correctamente");
            this.getProfe();
          } else {
            alert("No se pudo eliminar el profesor");
          }
        },
        (error) => {
          console.error("Error al eliminar profesor:", error);
          alert("Error al eliminar profesor");
        }
      );
    }
  }

  imprimir() {
  const dataAImprimir = this.procesarListado(this.ArrayProfesores);

  printJS({
    printable: dataAImprimir,
    type: 'json',
    properties: [
      { field: 'nombre', displayName: 'Nombre' },
      { field: 'apellido', displayName: 'Apellido' },
      { field: 'correo', displayName: 'Correo' },
      { field: 'especializacion', displayName: 'Especialización' },
      { field: 'telefono', displayName: 'Teléfono' }
    ],
    header: 'Listado de Profesores',
    style: 'table { width: 100%; border-collapse: collapse; font-size: 12px; } td, th { border: 1px solid #ccc; padding: 5px; }',
    scanStyles: false
  });
}

procesarListado(profesores: Array<Profesores>): Array<any> {
  return profesores.map(prof => ({
    nombre: prof.nombre,
    apellido: prof.apellido,
    correo: prof.correo,
    especializacion: (prof as any).espcializacion ?? '-', // fallback si tiene typo
    telefono: prof.telefono
  }));
}

  
 
}