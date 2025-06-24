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
  constructor(private router:Router,private activateRouter:ActivatedRoute){
    this.actividad = new Actividad();
  }
  
}
