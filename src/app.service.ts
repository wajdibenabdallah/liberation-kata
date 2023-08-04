import { Injectable } from '@nestjs/common';
import { Book, Discount, PRICE } from './types';
@Injectable()
export class AppService {
  calculatePrice(books: Book[]): number {
    // The idea is to group a sets of books together
    if (books.length === 0) return 0;
    if (books.length === 1) return PRICE;

    const flatBooks = books.flat(2);
    const setOfBooks = [...new Set(flatBooks)];

    let discount: number;
    // we could also just use an array of discount [1,0.95,0.90,0.80,0.75]
    switch (setOfBooks.length) {
      case 1: {
        discount = Discount.ONEBOOK;
        break;
      }
      case 2: {
        discount = Discount.TWOBOOKS;
        break;
      }
      case 3: {
        discount = Discount.THREEBOOKS;
        break;
      }
      case 4: {
        discount = Discount.FOURBOOKS;
        break;
      }
      default: {
        discount = Discount.ALLBOOKS;
        break;
      }
    }
    const cumulate = PRICE * setOfBooks.length * discount;
    // remove elements
    for (const book of setOfBooks) {
      const index = flatBooks.indexOf(book);
      flatBooks.splice(index, 1);
    }

    return cumulate + this.calculatePrice(flatBooks);
  }
}
