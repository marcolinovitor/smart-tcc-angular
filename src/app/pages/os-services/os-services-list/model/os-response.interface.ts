interface OsListResponse {
  status: number;
  aprovacao: boolean;
  referencia: string;
  dataAbertura: Date;
  problemaRelatado: string;
  problemaDescrito: string;
  carroId: number;
  carro: Carro;
  servicos: Servicos[];
  id: number;
}

interface Servicos {
  servicoId: number;
  servico: Servico;
  ordemServicoId: number;
  descricaoServico: string;
  valorServico: number;
  id: number;
}

interface Servico {
  nome: string;
  valor: number;
  id: number;
}

interface Carro {
  placa: string;
  modelo: string;
  marca: string;
  clienteId: number;
  cliente: Cliente;
  id: number;
}

interface Cliente {
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