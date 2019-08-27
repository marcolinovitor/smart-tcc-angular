export interface Request {
  Aprovacao: boolean;
  ProblemaRelatado: string;
  ProblemaDescrito: string;
  Carro: Carro;
  Servicos: Servico[];
  

//   constructor(form) {

//   }
}

export interface Servico {
  servicoId: number;
  descricaoServico: string;
  valorServico: number;
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