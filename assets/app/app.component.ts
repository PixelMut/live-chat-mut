import { Component } from '@angular/core';
import {ChatService} from './chat.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers:[ChatService]
})
export class AppComponent {

    user:String;
    room:String;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];

    constructor(private _chatSrv:ChatService){

        // called from service, whenever a new user enters a room
        this._chatSrv.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this._chatSrv.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatSrv.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    }

    // on the click on "join" button after choosing a room
    join(){
        this._chatSrv.joinRoom({user:this.user, room:this.room});
    }

    // on the click on "leave" button
    leave(){
        this._chatSrv.leaveRoom({user:this.user, room:this.room});
    }

    // whenever a user sends a message
    sendMessage(){
        this._chatSrv.sendMessage({user:this.user, room:this.room, message:this.messageText});
        this.messageText = '';
    }

}