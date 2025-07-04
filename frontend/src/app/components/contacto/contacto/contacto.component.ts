import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para el ngModel en el template
import emailjs from '@emailjs/browser'; // Importa la librería EmailJS
import { LoginFinalService } from '../../../services/LoginFinal/login-final.service'; // Servicio para obtener el ID del usuario logueado
import { ServicioUsuarioService } from '../../../services/servicioUsuario/servicio-usuario.service'; // Servicio para obtener los datos del usuario

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule], // Módulos necesarios para formularios
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  // Propiedades para almacenar los datos del formulario y del usuario
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  titulo: string = 'Consulta desde el Formulario de Contacto'; // Título por defecto para el asunto del email

  constructor(
    private loginService: LoginFinalService,
    private usuarioService: ServicioUsuarioService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario logueado al inicializar el componente
    const userId = this.loginService.idLogged();

    if (userId) {
      // Si hay un usuario logueado, intentar obtener sus datos (nombre y correo)
      this.usuarioService.getUsuarioPorId(userId).subscribe(
        (usuarios) => {
          // El servicio puede devolver un array, tomamos el primer usuario si existe
          if (usuarios && usuarios.length > 0) {
            const usuario = usuarios[0];
            console.log('Usuario obtenido:', usuario);
            this.nombre = usuario.username || ''; // Asignar el nombre de usuario
            this.correo = usuario.correo || '';   // Asignar el correo del usuario
          } else {
            console.warn('⚠️ No se encontró ningún usuario con el ID:', userId);
          }
        },
        (error) => {
          console.error('❌ Error al obtener usuario por ID:', error);
          // Opcional: manejar el error, por ejemplo, dejando los campos vacíos
          this.nombre = '';
          this.correo = '';
        }
      );
    } else {
      console.warn('⚠️ No hay usuario logueado. Los campos de nombre y correo deben ser llenados manualmente.');
      // Si no hay usuario logueado, los campos se mantienen vacíos para que el usuario los complete
    }
  }

  // Método para enviar el mensaje usando EmailJS
  enviarMensaje(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario (recargar la página)

    // Validar que los campos no estén vacíos antes de enviar
    if (!this.nombre || !this.correo || !this.mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Parámetros que se enviarán a la plantilla de EmailJS
    // ¡IMPORTANTE!: Las claves aquí (name, correo, message, title) deben coincidir EXACTAMENTE
    // con los marcadores de posición que definiste en tu plantilla de EmailJS (ej. {{name}}, {{correo}})
    const templateParams = {
      name: this.nombre,     // Se mapea a {{name}} en tu plantilla
      correo: this.correo,   // Se mapea a {{correo}} en tu plantilla
      message: this.mensaje, // Se mapea a {{message}} en tu plantilla
      title: this.titulo     // Se mapea a {{title}} en tu plantilla (para el asunto)
    };

    // Envío del correo electrónico utilizando EmailJS
    // Los argumentos son: Service ID, Template ID, templateParams, Public Key
    emailjs.send('service_mhf35vs', 'template_q0msjl7', templateParams, 'bJXEs2Ft7GHpOMEKC')
      .then(() => {
        alert('✅ Mensaje enviado correctamente');
        this.mensaje = ''; // Limpiar el campo del mensaje después de enviar
      }, (error) => {
        console.error('❌ Error al enviar el mensaje:', error);
        alert('Error al enviar mensaje. Por favor, inténtalo de nuevo más tarde.');
      });
  }
}