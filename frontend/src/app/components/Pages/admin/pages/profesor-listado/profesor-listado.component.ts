import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { Profesores } from '../../../../../models/Profesores/profesores';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-listado',
  imports: [CommonModule],
  templateUrl: './profesor-listado.component.html',
  styleUrl: './profesor-listado.component.css'
})
export class ProfesorListadoComponent {
  ArrayProfesores: Array<Profesores>;
  constructor(private servicioProfesor: ProfesoresService, private router: Router) {
    this.getProfe();
    this.ArrayProfesores = new Array<Profesores>();
  }

  getProfe() {
    this.servicioProfesor.getProfesores().subscribe(
      result => {
        console.log(result);
        result.forEach((element: any) => {
          let vprofe: Profesores = new Profesores();
          Object.assign(vprofe, element);
          this.ArrayProfesores.push(element);
          vprofe = new Profesores();
        });
      })
  }

  agregarProfesor() {
    this.router.navigate(['register-profesor', '0']);
  }

  editarProfesor(ArrayProfesores: Profesores) {
    this.router.navigate(['register-profesor', ArrayProfesores._id]);
  }

  eliminarProfesor(profesor: Profesores) {
  const confirmar = confirm(`¿Seguro que deseas eliminar a ${profesor.nombre} ${profesor.apellido}?`);
  if (confirmar && profesor._id) {
    this.servicioProfesor.deleteProfesor(profesor._id).subscribe(
      (result) => {
        if (result.status === "1") {
          alert("Profesor eliminado correctamente");
          this.ArrayProfesores = [];
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
}
