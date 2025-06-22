import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-socio',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './form-socio.component.html',
  styleUrl: './form-socio.component.css'
})
export class FormSocioComponent {

}
