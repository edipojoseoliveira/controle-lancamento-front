import { Jornada } from "./jornada";

export class Marco {
    id?:number;
    posicao?:number;
    nome?:string;
    meta?:string;
    concluido?:boolean;
    jornada?:Jornada;

    constructor() {
        this.concluido = false;
    }
}