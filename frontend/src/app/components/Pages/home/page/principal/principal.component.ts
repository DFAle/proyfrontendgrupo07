import { Component } from '@angular/core';
import { NoticiaService } from '../../../../../services/serviceNoticia/noticia.service';
import { Noticia } from '../../../../../models/Noticias/noticia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  
  noticias!:Array<Noticia>;
  noticia!:Noticia;
  
  constructor(private noticiaService:NoticiaService){
    this.cargarNoticias();
  }

cargarNoticias(){
/*this.noticiaService.getNoticias().subscribe(
   (result) => {
    this.noticias = [];
   result.data.forEach( (element: any) => {
     this.noticia = new Noticia(element.title,element.description,element.thumbnail)
     this.noticias.push(this.noticia)
   });
   },
  (error) => {
        console.error("Error en la petición:", error);
      })*/
}


}
