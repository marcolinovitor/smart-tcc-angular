export interface Request {
    CarroId;
    Aprovacao: boolean;
    ProblemaRelatado: string;
    ProblemaDescrito: string;
    Carro: Carro;
    Servicos: Servico[];
}

export interface Servico {
    ServicoId: number;
    DescricaoServico: string;
    ValorServico: number;
}

export interface Carro {
    Placa: string;
    Modelo: string;
    Marca: string;
    Cliente: Cliente;
}

export interface Cliente {
    Nome: string;
    CpfCnpj: string;
    Telefone: string;
    Email: string;
    PerfilSistema: string;
}