import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-usuario',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.css'
})
export class FormUsuarioComponent {

registroForm = {
    username: '',
    email: '',
    password: ''
  };

  showPassword = false;
  msgRegistro = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  registrar() {
    // Lógica para registrar al usuario
    console.log('Datos de registro:', this.registroForm);
    // Aquí iría la llamada a tu servicio de autenticación
  }

  cancelar() {
    this.registroForm = {
      username: '',
      email: '',
      password: ''
    };
    this.msgRegistro = '';
  }

  registroFormValido(): boolean {
    return this.registroForm.username.length >= 4 && 
           this.registroForm.password.length >= 6 &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registroForm.email);
  }


}
