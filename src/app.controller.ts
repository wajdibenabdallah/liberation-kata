import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Book } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  calculatePrice(books: Book[]): number {
    return this.appService.calculatePrice(books);
  }
}
