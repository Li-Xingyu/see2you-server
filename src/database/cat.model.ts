import { prop } from "@typegoose/typegoose";


export class Cat {

  @prop()
  name: string;
  @prop({ required: true })
  url: string;
}