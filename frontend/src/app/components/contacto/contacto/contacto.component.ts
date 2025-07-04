import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service';
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  titulo: string = 'Consulta desde el Formulario de Contacto';

  constructor(
    private loginService: LoginFinalService,
    private usuarioService: ServicioUsuarioService
  ) {}

  ngOnInit(): void {
    const userId = this.loginService.idLogged();

    if (userId) {
      this.usuarioService.getUsuarioPorId(userId).subscribe(
        (usuario) => { // ¡CAMBIO AQUÍ! Ahora esperamos UN SOLO 'usuario' (objeto)
          if (usuario) { // Verificamos si el objeto usuario no es null o undefined
            console.log('Usuario obtenido:', usuario);
            this.nombre = usuario.username || '';
            this.correo = usuario.correo || '';
          } else {
            // Este caso se dará si la API devuelve null/undefined o un objeto vacío {}
            console.warn('⚠️ La API devolvió un objeto nulo o vacío para el ID:', userId);
          }
        },
        (error) => {
          // Este error se capturará si la llamada HTTP falla (ej. 404, 500)
          console.error('❌ Error al obtener usuario por ID:', error);
          this.nombre = '';
          this.correo = '';
        }
      );
    } else {
      console.warn('⚠️ No hay usuario logueado. Los campos de nombre y correo deben ser llenados manualmente.');
    }
  }

  // ... (tu método enviarMensaje permanece igual)
  enviarMensaje(event: Event): void {
    event.preventDefault();

    if (!this.nombre || !this.correo || !this.mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const templateParams = {
      name: this.nombre,
      correo: this.correo,
      message: this.mensaje,
      title: this.titulo
    };

    emailjs.send('service_mhf35vs', 'template_q0msjl7', templateParams, 'bJXEs2Ft7GHpOMEKC')
      .then(() => {
        alert('✅ Mensaje enviado correctamente');
        this.mensaje = '';
      }, (error) => {
        console.error('❌ Error al enviar el mensaje:', error);
        alert('Error al enviar mensaje. Por favor, inténtalo de nuevo más tarde.');
      });
  }
}