interface OsListResponse {
  status: number;
  aprovacao: boolean;
  referencia: string;
  problemaRelatado: string;
  problemaDescrito: string;
  carroId: number;
  carro?: any;
  servicos: any[];
  id: number;
}