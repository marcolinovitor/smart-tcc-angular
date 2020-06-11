import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PerguntasResponse, Alternativa } from '../models/perguntas.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnChanges {

    selected = false;
    @Input() pergunta: PerguntasResponse;
    @Output() escolha = new EventEmitter<Alternativa>();
    @Output() novoAtend = new EventEmitter<boolean>();
    @Output() novoCarro = new EventEmitter<boolean>();

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes);
    }

    setAlternativa(id) {
        this.selected = true;
        const alternativa = this.pergunta.alternativas.find(f => f.id == id);
        this.escolha.emit(alternativa);
    }

    cadastrar() {
        this.novoCarro.emit(true);
    }

    novoAtendimento() {
        this.novoAtend.emit(true);
    }

    finalizar() {
        this.novoAtend.emit(false);
    }

}
