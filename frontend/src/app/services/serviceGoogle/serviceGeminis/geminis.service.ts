import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminisService {

  apiKey:string = "";
  url:string = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

  constructor(private _http: HttpClient) { }

  generarTexto(prompt:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-goog-api-key': this.apiKey, // Clave de API en el encabezado
    });

    const body = {
      "contents": [
      {
        "parts": [
          {
            "text": prompt
          }
        ]
      }
    ]
    }

  return this._http.post(this.url, body, { headers });
  }
      

}
