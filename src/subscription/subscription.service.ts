import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/subscription-dto';
import { UpdateSubscriptionDto } from './dto/update-subscription-dto';
import { SubscriptionDocument } from './schemas/subscription.schema';
import { SubscriptionRpository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRpository) {}

  async getSubscription(
    id: string,
    userId: string,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionRepository.findOne({ _id: id, userId });
  }

  async getSubscriptions(userId: string): Promise<SubscriptionDocument[]> {
    return this.subscriptionRepository.find({ userId });
  }

  async createSubscription(
    subscription: CreateSubscriptionDto,
    userId: string,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionRepository.create(subscription, userId);
  }

  async updateSubscription(
    id: any,
    subscriptionUpdates: UpdateSubscriptionDto,
    userId: string,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionRepository.findOneAndUpdate(
      { _id: id, userId },
      subscriptionUpdates,
    );
  }

  async removeSubscription(
    id: string,
    userId: string,
  ): Promise<SubscriptionDocument> {
    return this.subscriptionRepository.findOneAndDelete({ _id: id, userId });
  }
}
