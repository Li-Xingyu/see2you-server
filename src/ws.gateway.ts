import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { json } from "stream/consumers";
import * as WebSocket from 'ws';

@WebSocketGateway(3002)
export class WsStartGateway {
  private connectCounts = 0   

  handleConnection(client: any,){
    this.connectCounts++
    client.join("test")
    console.log('有人链接了'+client.id);   
    client.broadcast.emit('tmp',this.connectCounts);
  }

  handleDisconnect(client:any){
    this.connectCounts--
    console.log('有人断开链接了'+client.id);   
  }
 

  @SubscribeMessage('video-control') 
  control(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    data=JSON.parse(data)
    if (data.action=="sync"){
      
      data['senduser']=client.id
      
      }
    console.log('同步client:',client.id, data);
    if (data.action=="seek"&&data.senduser!="" ){
      data=JSON.stringify(data)
      client.to(JSON.parse(data).senduser).emit('video-control',data);
      }else{
        data=JSON.stringify(data)
        client.broadcast.emit('video-control',data);
      }
    
  }
  @SubscribeMessage('hello') 
  hello(@MessageBody() data: any): any {
    return {
      "event": "hello",
      "data": data,
      "msg": 'rustfisher.com'
    };
  }
  @SubscribeMessage('hello2')
  hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    console.log('收到消息 client:', client);
    client.broadcast.emit('tmp',"fuck");
    return { event: 'hello2', data: data };
  } 
  @SubscribeMessage('hello3')
  hello3(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
    
    console.log('收到消息 client:', data.name);
    client.to(data.name).emit('tmp',"asfdafd")

  } 
  

}