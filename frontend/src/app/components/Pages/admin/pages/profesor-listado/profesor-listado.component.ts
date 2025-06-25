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
  constructor(private servicioProfesor: ProfesoresService,private router: Router){
    this.getProfe();
    this.ArrayProfesores = new Array<Profesores>();
  }

  getProfe(){
    this.servicioProfesor.getProfesores().subscribe(
      result => {
        console.log(result);
        result.forEach((element: any) => {
          let vprofe : Profesores = new Profesores();
          Object.assign(vprofe, element);
          this.ArrayProfesores.push(element);
          vprofe = new Profesores();
        }); 
      })
  }
  agregarProfesor(){
    this.router.navigate(['register-profesor', '0']);
  }
  elimiarProfesor(profesor:Profesores){
     this.servicioProfesor.deleteProfesor(profesor).subscribe(
      result => {
        console.log(result);
        alert("profesor borrado");
        this.router.navigate(['/admin/profesor-listado']);
      }) 
  }
}
