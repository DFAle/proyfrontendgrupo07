import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginFinalService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = 'http://localhost:3000/api/usuario/';
  }

  public login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify({ username, password });
    return this._http.post(this.hostBase + 'login', body, httpOptions);
  }

  public logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("rol");
  }

  public userLogged(): string | null {
    return sessionStorage.getItem("user");
  }

  public rolLogged(): string | null {
    return sessionStorage.getItem("rol");
  }

  public idLogged(): string | null {
    return sessionStorage.getItem("userid");
  }

  public isLogged(): boolean {
    return this.userLogged() !== null;
  }
}
