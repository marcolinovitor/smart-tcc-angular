export class OrcamentoForm {
    carro = new Carro();
    servico = new Array<Servico>();
    relatado: string;
    diagnosticado: string;
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
    servicoId: number;
    descricaoServico: string;
    valorServico: number;
}