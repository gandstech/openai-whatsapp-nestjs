import { Controller, Get, Post, Req, RawBodyRequest, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('node-nest/webhook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('facebook')
  facebookWebhookVerify(@Query() query :any): string {
    return this.appService.facebookWebhookVerify(query);
  }

  @Post('facebook')
  facebookWebhook(@Req() req: RawBodyRequest<Request>): string {
    const body = req.body;
    return this.appService.facebookWebhook(body);
  }
}
