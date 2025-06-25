import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfesoresService } from '../../../services/serviceProfesores/profesores.service';
import { Profesores } from '../../../models/Profesores/profesores';

@Component({
  selector: 'app-form-profesor',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form-profesor.component.html',
  styleUrl: './form-profesor.component.css'
})
export class FormProfesorComponent {
  accion: string = '';
  profesor:Profesores
  constructor(private router: Router,private serviceProfesor: ProfesoresService,private activateRouter: ActivatedRoute){
    this.profesor = new Profesores();
  }

   ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      // const id = +params['_id'];
      if (params['id'] == 0) {
        this.accion = 'new';
      } else {
        this.accion = 'update';
 //       this.CargarFormulario(params['id']);
      }
    });
  }


   RegistrarUsuario() {
    this.serviceProfesor.addProfesor(this.profesor).subscribe((
      result) => {
        console.log(result);
        if (result.status == 1) {
          alert('se agrego correctamente');
          this.router.navigate(['/admin/profesor-listado']);
        }
    });
  }
  
}
