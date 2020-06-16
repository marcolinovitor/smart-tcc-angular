import { PreOrdemResponse } from './pre-ordem.response';

export class PreOrdemModel {
    id: number;
    referencia: string;
    carro: CarroPre;
    clienteCpf: string;
    clienteNome: string;
    telefone: string;
    problemaDescrito: string;
    problemaRelatado: string;
    data: string;

    constructor(preOrdem: PreOrdemResponse) {
        this.id = preOrdem.id;
        this.data = preOrdem.dataAbertura;
        this.referencia = preOrdem.referencia;
        this.telefone = this.formatTelefone(preOrdem.carro.cliente.telefone);
        this.clienteNome = preOrdem.carro.cliente.nome;
        this.carro = {
            marca: preOrdem.carro.marca,
            modelo: preOrdem.carro.modelo,
            placa: preOrdem.carro.placa,
        };
        this.clienteCpf = preOrdem.carro.cliente.cpfCnpj;
        this.problemaDescrito = preOrdem.problemaDescrito;
        this.problemaRelatado = preOrdem.problemaRelatado;
    }

    formatTelefone(telefone: string): string {
        const ddd = telefone.substr(0, 2);
        const fone = telefone.substr(2);
        return `(${ddd}) ${fone}`;
    }
}

export interface CarroPre {
    placa: string;
    modelo: string;
    marca: string;
}