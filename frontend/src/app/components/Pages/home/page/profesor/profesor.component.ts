import { Component } from '@angular/core';
import { ProfesoresService } from '../../../../../services/serviceProfesores/profesores.service';
import { CommonModule } from '@angular/common';
import { Profesores } from '../../../../../models/Profesores/profesores';

@Component({
  selector: 'app-profesor',
  imports: [CommonModule],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css',
})
export class ProfesorComponent {
  profesores:Array<Profesores>
  constructor(private servicioProfesor: ProfesoresService) {
    this.profesores = new Array<Profesores>();
    this.cargarProfesores();
  }

  cargarProfesores() {
    this.servicioProfesor.getProfesores().subscribe(
      (result) => {
        let vprofesores: Profesores = new Profesores();
        result.forEach((element: any) => {
          Object.assign(vprofesores, element);
          this.profesores.push(vprofesores);
          vprofesores = new Profesores();
        });
        console.log(this.profesores)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
