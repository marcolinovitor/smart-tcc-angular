export interface OsResponse {
  status: number;
  aprovacao: boolean;
  referencia: string;
  problemaRelatado: string;
  problemaDescrito: string;
  carroId: number;
  carro: Carro;
  servicos: Servico[];
  id: number;
}

export interface Servico {
  servicoId: number;
  servico?: any;
  ordemServicoId: number;
  descricaoServico: string;
  valorServico: number;
  id: number;
}

export interface Carro {
  placa: string;
  modelo: string;
  marca: string;
  clienteId: number;
  cliente: Cliente;
  id: number;
}

export interface Cliente {
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  senha: string;
  perfilSistema: string;
  oficinaId: number;
  oficina?: any;
  carros: any[];
  id: number;
}