import { Injectable } from '@nestjs/common';
import { Book, DISCOUNT, PRICE } from './types';
@Injectable()
export class AppService {
  calculatePrice(books: Book[]): number {
    // The idea is to group a sets of books together
    if (books.length === 0) return 0;
    if (books.length === 1) return PRICE;

    const flatBooks = books.flat(2);
    const setOfBooks = [...new Set(flatBooks)];

    const cumulate = PRICE * setOfBooks.length * DISCOUNT[setOfBooks.length];
    // remove elements
    for (const book of setOfBooks) {
      const index = flatBooks.indexOf(book);
      flatBooks.splice(index, 1);
    }

    return cumulate + this.calculatePrice(flatBooks);
  }
}
