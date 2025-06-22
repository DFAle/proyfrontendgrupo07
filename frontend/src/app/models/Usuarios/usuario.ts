export class Usuario {
  _id!: string;
  username: string;
  password: string;
  activo: boolean;
  rol: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.activo = true;
    this.rol = '';
  }
}
