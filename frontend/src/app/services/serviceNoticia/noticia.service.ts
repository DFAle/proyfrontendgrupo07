import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private _http: HttpClient) { }

  public getNoticias(): Observable<any> {
    // petición por get a esa url de un api rest
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host': 'google-news22.p.rapidapi.com',
        'X-RapidAPI-Key': 'b5c867427fmsha100d1971d3937bp162a48jsn90c05f3aa0dd'
      })
    };
    return this._http.get("https://google-news22.p.rapidapi.com/v1/topic-headlines?country=ar&language=es&topic=Sports", httpOptions);
  }
}
