import { Injectable } from '@nestjs/common';
import { Book } from './types';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  calculatePrice(books: Book[]): number {
    return null;
  }
}
