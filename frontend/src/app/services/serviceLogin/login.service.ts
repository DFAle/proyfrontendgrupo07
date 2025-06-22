import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @ Injectable()
 * Este servicio está disponible en toda la aplicación gracias a providedIn: 'root',
 * lo que permite acceder a él desde cualquier componente sin necesidad de importarlo manualmente.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // URL base del backend donde se realizarán las peticiones HTTP
  hostBase: string;

  /**
   * Constructor del servicio.
   * Inyecta el cliente HTTP de Angular y establece la URL base del API.
   * @param _http Servicio HttpClient para realizar solicitudes HTTP.
   */
  constructor(private _http: HttpClient) {
    this.hostBase = 'http://localhost:3000/api/usuario/';
  }

  /**
   * Método para iniciar sesión con nombre de usuario y contraseña.
   * Realiza una solicitud POST al endpoint /login del backend.
   *
   * @param username Nombre de usuario proporcionado por el cliente.
   * @param password Contraseña del usuario.
   * @returns Observable<any> Respuesta del servidor (puede incluir token, datos del usuario, etc.).
   */
  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Configura el tipo de contenido como JSON
      }),
    };

    // Crea el cuerpo de la solicitud en formato JSON
    let body = JSON.stringify({ username: username, password: password });
    console.log('Cuerpo de la solicitud:', body); // Para depuración

    // Realiza la petición POST al endpoint del backend
    return this._http.post(this.hostBase + 'login', body, httpOption);
  }

  /**
   * Método para cerrar sesión.
   * Elimina los datos del usuario almacenados en sessionStorage.
   */
  public logout(): void {
    sessionStorage.removeItem('user'); // Elimina el nombre de usuario
    sessionStorage.removeItem('rol'); // Elimina el perfil del usuario
    sessionStorage.removeItem('userid'); // Elimina el ID del usuario
  }

  /**
   * Verifica si hay un usuario autenticado.
   * @returns boolean true si el usuario está logueado, false en caso contrario.
   */
  public userLoggedIn(): boolean {
    var resultado = false;
    var usuario = sessionStorage.getItem('user');
    if (usuario != null) {
      resultado = true; // Si existe el item 'user', el usuario está autenticado
    }
    return resultado;
  }

  /**
   * Obtiene el nombre del usuario actualmente autenticado.
   * @returns string | null El nombre de usuario o null si no hay sesión activa.
   */
  public userLogged(): string | null {
    var usuario = sessionStorage.getItem('user');
    return usuario;
  }

  /**
   * Obtiene el ID del usuario actualmente autenticado.
   * @returns string | null El ID del usuario o null si no hay sesión activa.
   */
  public idLogged(): string | null {
    var id = sessionStorage.getItem('userid');
    return id;
  }
}
