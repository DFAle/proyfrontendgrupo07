import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  urlBase :string = "http://localhost:3000/api/profesor/"
  constructor(private _http:HttpClient) { 
    
  }

  public getProfesores():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        
      }),
      params : new HttpParams()
    }
    return this._http.get(this.urlBase, httpOptions);
  }
}
