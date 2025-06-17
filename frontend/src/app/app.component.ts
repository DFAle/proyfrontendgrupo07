import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component'; //Después borrar esto

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent], //Despues borrar el import de login
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
