import { Horario } from "../Horario/horario";
import { Profesores } from "../Profesores/profesores";

export class Actividad {
    _id!:string;
    titulo!:String;
    foto!:String;
    detalle!:String;
    estado!:Boolean;
    nivel!:String;
    cuposDisponibles!:Number;
    cantidadInscriptos!:Number;
    horarios!:Horario;
    profesor!:Profesores;
}
