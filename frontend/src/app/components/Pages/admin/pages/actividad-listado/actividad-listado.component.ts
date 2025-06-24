import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actividad-listado',
  imports: [],
  templateUrl: './actividad-listado.component.html',
  styleUrl: './actividad-listado.component.css'
})
export class ActividadListadoComponent {

  constructor(private router:Router,private activateRouter:ActivatedRoute){

  }
   agregarActividad() {
    this.router.navigate(['register-actividad', '0']);
  }
}
