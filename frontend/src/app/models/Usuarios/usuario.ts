import { Rol } from "./rol/rol";

export class Usuario {
  _id!: string;
  nombre!: string;
  apellido!: string;
  dni!: string;
  username!: string;
  correo!: string;
  password!: string;
  activo!: boolean;
  rol!: Rol;

  constructor() {
    this.username = '';
    this.password = '';
    this.activo = true;
    this.rol = new Rol();
  }
}

