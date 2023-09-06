import { Marco } from "./marco";

export class Jornada {
    id?: number;
    nome?: string;
    marcos: Marco[];

    constructor() {
        this.marcos = [];
    }
}