import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Category } from '@core/microvideos/category/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
