import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateSubscriptionDto } from './dto/subscription-dto';
import {
  SubscriptionDocument,
  Subscription,
} from './schemas/subscription.schema';

@Injectable()
export class SubscriptionRpository {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async findOne(
    filterQuery: FilterQuery<SubscriptionDocument>,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionModel.findOne(filterQuery);
  }

  async find(
    filterQuery: FilterQuery<SubscriptionDocument>,
  ): Promise<SubscriptionDocument[]> {
    return this.subscriptionModel.find(filterQuery);
  }

  async create(
    subscription: CreateSubscriptionDto,
    userId: string,
  ): Promise<SubscriptionDocument> {
    const newSubscription = new this.subscriptionModel({
      name: subscription.name,
      userId,
      startDate: new Date(subscription.startDate),
      endDate: new Date(subscription.endDate),
      renewalDate: new Date(subscription.renewalDate),
      autoRenewal: subscription.autoRenewal,
      description: subscription.description,
      price: subscription.price,
      renewalPrice: subscription.renewalPrice,
    });
    return newSubscription.save();
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<SubscriptionDocument>,
    subscription: Partial<SubscriptionDocument>,
  ): Promise<any> {
    return this.subscriptionModel.findOneAndUpdate(
      filterQuery,
      {
        name: subscription.name,
        startDate: new Date(subscription.startDate),
        endDate: new Date(subscription.endDate),
        renewalDate: new Date(subscription.renewalDate),
        autoRenewal: subscription.autoRenewal,
        description: subscription.description,
        price: subscription.price,
        renewalPrice: subscription.renewalPrice,
      },
      {
        new: true,
      },
    );
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<SubscriptionDocument>,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionModel.findOneAndDelete(filterQuery);
  }
}
