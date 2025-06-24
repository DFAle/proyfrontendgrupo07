import { Profesor } from "../../services/actividad.service/actividad.service";
import { Horario } from "../Horario/horario";

export class Actividad {
    titulo!:String;
    foto!:String;
    detalle!:String;
    estado!:Boolean;
    nivel!:String;
    cuposDisponibles!:Number;
    cantidadInscriptos!:Number;
    horario!:Horario;
    profesor!:Profesor;
}
