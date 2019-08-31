import { IOrcamentoForm } from './orcamento-form.interface';

export class OrcamentoForm {
    carro = new Carro();
    servico = new Array<Servico>();
    relatado: string;
    diagnosticado: string;

    constructor(data: IOrcamentoForm, servicos: Servico[]) {
        this.carro.cliente.nome = data.nome;
        this.carro.cliente.cpfCnpj = data.cpfcnpj;
        this.carro.cliente.email = data.email;
        this.carro.cliente.telefone = data.fone;
        this.carro.cliente.perfilSistema = 'customer';
        this.carro.marca = data.marca;
        this.carro.modelo = data.modelo;
        this.carro.placa = data.placa;
        this.relatado = data.relatado;
        this.diagnosticado = data.diagnosticado;
        this.servico = servicos;
    }
}

export class Cliente {
    nome: string;
    cpfCnpj: string;
    telefone: string;
    email: string;
    senha: string;
    perfilSistema: string;
}

export class Carro {
    placa: string;
    modelo: string;
    marca: string;
    cliente = new Cliente();
}

export class Servico {
    ServicoId: number;
    DescricaoServico: string;
    ValorServico: number;
}