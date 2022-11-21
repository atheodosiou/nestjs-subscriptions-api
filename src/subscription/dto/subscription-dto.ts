export class CreateSubscriptionDto {
  name: string;
  startDate: Date;
  endDate?: Date;
  autoRenewal?: boolean;
  renewalDate?: Date;
  description?: string;
  price: Number;
  renewalPrice?: Number;
}
