import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;
  @Prop({ type: String, required: true, unique: true })
  name: string;
  @Prop({ type: Date, required: true })
  startDate: Date;
  @Prop({ type: Date })
  endDate: Date;
  @Prop({ type: String, maxlength: 500 })
  description: string;
  @Prop({ type: Boolean, default: false })
  autoRenewal: boolean;
  @Prop({ type: Date })
  renewalDate: Date;
  @Prop({ type: Number, required: true })
  price: Number;
  @Prop({ type: Number })
  renewalPrice: Number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
