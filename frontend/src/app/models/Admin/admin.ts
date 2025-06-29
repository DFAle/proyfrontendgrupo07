export class Admin {
    _id!: string;
usuario!: string;
contrasenia!: string;
perfil!: string;

constructor(id:string="", usuario:string="", contrasenia:string="", perfil:string="") {
this._id = id;
this.usuario = usuario;
this.contrasenia = contrasenia;
this.perfil = perfil;
}
}