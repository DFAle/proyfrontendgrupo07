import { Component } from '@angular/core';
import { NoticiaService } from '../../../../../services/serviceNoticia/noticia.service';
import { Noticia } from '../../../../../models/Noticias/noticia';
import { CommonModule } from '@angular/common';
import { ActividadService } from '../../../../../services/actividad.service/actividad.service';
import { GeminisService } from '../../../../../services/serviceGoogle/serviceGeminis/geminis.service';

@Component({
  selector: 'app-principal',
  imports: [CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  noticias!: Array<Noticia>;
  noticia!: Noticia;

  constructor(private noticiaService: NoticiaService, private actividadService: ActividadService,
    private geminisService: GeminisService) {
    this.cargarNoticias();
    this.cargarNoticiaPropia();
  }


  cargarNoticias() {
    this.noticiaService.getNoticias().subscribe(
      (result) => {
        this.noticias = [];
        result.data.forEach((element: any) => {
          this.noticia = new Noticia(element.title, element.description, element.thumbnail)
          this.noticias.push(this.noticia)
        });
      },
      (error) => {
        console.error("Error en la petición:", error);
      })
  }
  nuestraNoticia:Array<any>=[];
    cargarNoticiaPropia() {
    this.actividadService.consumirActividad().subscribe(
      (result) => {
       console.log(result);
       this.nuestraNoticia=result;
       
      },
      (error) => {
        console.error("Error en la petición:", error);
      })
  }


  /*
  generarTexto(prompt: string): Observable<string> { // Ahora retorna un Observable<string>
    return this.geminisService.generarTexto(prompt).pipe(
      map((result: any) => {
        const generatedText = result.candidates[0].content.parts[0].text;
        console.log("Texto generado por IA:", generatedText); // Para depuración
        return generatedText;
      }),
      catchError((error) => {
        console.error("Error al generar texto con Gemini:", error);
        return of(''); // Retorna un Observable vacío o un string por defecto en caso de error
      })
    );
  }
  */



}
