export interface Alternativa {
	alternativa: string;
	perguntaOSId: number;
	alternativaFinal: boolean;
	preAberturaOSId?: any;
	proximaPerguntaOSId?: any;
	proximaPerguntaOS?: any;
	preAberturaOS?: any;
	id: number;
}

export class PerguntasResponse {
    isClient?: boolean;
	pergunta: string;
	perguntaInicial: boolean;
	alternativas: Alternativa[];
    id: number;
    
    setClienteEscolha(alter: Alternativa) {
        const item = new PerguntasResponse();
        item.isClient = true;
        item.pergunta = alter.alternativa;
        return item;
    }
}