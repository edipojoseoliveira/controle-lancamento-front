import { TipoSubNichoEnum } from "../enumerator/TipoSubNichoEnum.enum";

export class SubNicho {
    id?:number;
    nome?:string;
    tipo?:TipoSubNichoEnum;
    resultadoDoExpert?:boolean;
    resultadoDeClientes?:boolean;
    pessoasPedindoProduto?:boolean;
    ativo?:boolean;
}
