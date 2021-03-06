import { Injectable, EventEmitter } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { urls } from 'src/environments/urls';

@Injectable({
    providedIn: 'root'
})
export class SignalRService {

    private hubConnection: signalR.HubConnection;
    public novasOrdens = new EventEmitter<number>();
    public novaAprovacao = new EventEmitter();

    constructor() { }

    public startHub = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(urls.smart.hub)
            .build();
    };

    public startConn = () => {
        this.hubConnection.start()
            .then(() => {
                console.warn('Hub started!');
                this.ordersNotification();
                this.aproverNotification();
            })
    }

    public ordersNotification = () => {
        this.hubConnection.on('ReceberInsercaoOrcamento', (notification) => {
            // console.log(notification);
            this.novasOrdens.emit(1);
        });
    }

    public aproverNotification = () => {
        this.hubConnection.on('ReceberOSStatus', (aproved) => {
            // console.log(aproved);
            this.novaAprovacao.emit(aproved);
        });
    }
}
