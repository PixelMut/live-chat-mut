import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class ChatService{

    // to create a new connection ==> Triggers the io.on('connection') on the www
    private socket = io('http://localhost:3000');

    // send to te backend that someone joined
    joinRoom(data){
        this.socket.emit('join',data);
    }

    // triggered when someone joins the room, from the socket.broadcast.to(room).emit of the www
    newUserJoined(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new user joined', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });
        return observable;
    }

    // emits to the backend, that someone is leaving
    leaveRoom(data){
        this.socket.emit('leave',data);
    }

    // to notify all other users
    userLeftRoom(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

    sendMessage(data){
        this.socket.emit('message',data);
    }

    newMessageReceived(){
        let observable = new Observable<{user:String, message:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}