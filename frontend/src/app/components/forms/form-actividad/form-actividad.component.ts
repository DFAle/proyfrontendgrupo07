import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Actividad } from '../../../models/actividad/actividad';

@Component({
  selector: 'app-form-actividad',
  imports: [FormsModule,CommonModule],
  templateUrl: './form-actividad.component.html',
  styleUrl: './form-actividad.component.css'
})
export class FormActividadComponent {
  actividad: Actividad;
  accion: string = '';
  constructor(private router:Router,private activateRouter:ActivatedRoute){
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
}
