import { PreAberturaResponse } from './abertura-os.interface';

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
    descricao?: string;
	perguntaInicial: boolean;
	alternativas: Alternativa[];
    id: number;
    encerramento?: PreAberturaResponse;
    
    setClienteEscolha(alter: Alternativa) {
        const item = new PerguntasResponse();
        item.isClient = true;
        item.pergunta = alter.alternativa;
        return item;
    }

    setEncerramento(preOrdem: PreAberturaResponse) {
        const item = new PerguntasResponse();
        item.isClient = false;
        item.pergunta = preOrdem.assunto;
        item.descricao = preOrdem.descricao;
        return item;
    }
}