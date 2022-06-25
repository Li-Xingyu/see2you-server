import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsStartGateway } from './ws.gateway'
import {HttpService,HttpModule}from '@nestjs/axios';
import {CatsModule} from './database/cat.module'
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  // imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/students', {useNewUrlParser: true})],
  imports:[CatsModule,HttpModule,TypegooseModule.forRoot('mongodb://127.0.0.1:27017/see2you')],
  controllers: [AppController],
  providers: [AppService,WsStartGateway],
})
export class AppModule {}
