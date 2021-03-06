import { IOrcamentoForm } from './orcamento-form.interface';

export class OrcamentoForm {
    carroId: number;
    carro = new Carro();
    servico = new Array<Servico>();
    relatado: string;
    diagnosticado: string;

    constructor(data: IOrcamentoForm, servicos: Servico[], carro) {
        this.carro.cliente.nome = data.nome;
        this.carro.cliente.cpfCnpj = data.cpfcnpj;
        this.carro.cliente.email = data.email;
        this.carro.cliente.telefone = data.fone;
        this.carro.cliente.perfilSistema = 'customer';
        this.carro.marca = carro.marca;
        this.carro.modelo = carro.modelo;
        this.carro.placa = data.placa;
        this.relatado = data.relatado;
        this.diagnosticado = data.diagnosticado;
        this.servico = servicos;
        this.carroId = carro.id;
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