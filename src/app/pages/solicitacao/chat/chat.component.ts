import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PerguntasResponse, Alternativa } from '../models/perguntas.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    selected = false;
    @Input() pergunta: PerguntasResponse;
    @Output() escolha = new EventEmitter<Alternativa>();

    constructor() { }

    ngOnInit(): void {
    }

    setAlternativa(id) {
        this.selected = true;
        const alternativa = this.pergunta.alternativas.find(f => f.id == id);
        this.escolha.emit(alternativa);
    }

}
