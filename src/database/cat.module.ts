import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Cat } from "./cat.model";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import {HttpService,HttpModule}from '@nestjs/axios';
@Module({
  imports: [HttpModule,TypegooseModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}