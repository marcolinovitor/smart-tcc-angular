export class Cliente {
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

export class Carro {
	placa: string;
	modelo: string;
	marca: string;
	clienteId: number;
	cliente = new Cliente();
	id: number;
}

export class PreOrdemResponse {
	carroId: number;
	carro = new Carro();
	referencia: string;
	problemaRelatado: string;
	problemaDescrito: string;
	dataAbertura: string;
	id: number;
}