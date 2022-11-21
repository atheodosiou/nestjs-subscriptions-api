import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSubscriptionDto } from './dto/subscription-dto';
import { UpdateSubscriptionDto } from './dto/update-subscription-dto';
import { Subscription } from './schemas/subscription.schema';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSubscription(
    @Param('id') userId: string,
    @Req() req: any,
  ): Promise<Subscription> {
    return this.subscriptionService.getSubscription(userId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSubscriptions(@Req() req: any): Promise<Subscription[]> {
    return this.subscriptionService.getSubscriptions(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Req() req: any,
  ): Promise<Subscription> {
    console.log(req.user);
    return this.subscriptionService.createSubscription(
      createSubscriptionDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateSubscription(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Req() req: any,
  ): Promise<Subscription> {
    return this.subscriptionService.updateSubscription(
      id,
      updateSubscriptionDto,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string, @Req() req: any): Promise<any> {
    return this.subscriptionService.removeSubscription(id, req.user.userId);
  }
}
