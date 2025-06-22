import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home',
  imports: [RouterLink],
  standalone: true,
  providers: [],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {

  constructor(private router: Router){
    
  }
  RegistrarUsuario(){
      this.router.navigate(['/register']);
  }
}
