import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book, DISCOUNT, PRICE } from './types';
import * as _ from 'lodash';

describe('AppController', () => {
  let appController: AppController;

  const mapTimes = (iteration: number, values: Array<Book> | Book) => {
    return _.times(iteration, () => values);
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Test Function calculatePrice', () => {
    describe('Simple Case: Test differents Books', () => {
      it('Case: 1 BOOK"', () => {
        const booksExample1 = [Book.FOURTH];
        const booksExample2 = [Book.THIRD];

        expect(appController.calculatePrice(booksExample1)).toBe(PRICE);
        expect(appController.calculatePrice(booksExample2)).toBe(PRICE);
      });
      it('Case: 2 BOOKS"', () => {
        const booksExample1 = [Book.FOURTH, Book.FIFTH];
        const booksExample2 = [Book.THIRD, Book.SECOND];
        const price = PRICE * 2 * DISCOUNT[2];

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });
      it('Case: 3 BOOKS"', () => {
        const booksExample1 = [Book.FOURTH, Book.FIFTH, Book.FIRST];
        const booksExample2 = [Book.THIRD, Book.SECOND, Book.FIRST];
        const price = PRICE * 3 * DISCOUNT[3];

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });
      it('Case: 4 BOOKS"', () => {
        const booksExample = [Book.FOURTH, Book.FIFTH, Book.FIRST, Book.SECOND];
        const price = 8 * 4 * DISCOUNT[4];

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });
      it('Case: All BOOKS"', () => {
        const booksExample = [
          Book.FIRST,
          Book.SECOND,
          Book.THIRD,
          Book.FOURTH,
          Book.FIFTH,
        ];
        const price = 8 * 5 * DISCOUNT[5];

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });
    });

    describe('Simple Case: Test identical Books', () => {
      it('Case: many identical BOOKS"', () => {
        const booksExample1 = mapTimes(10, Book.FIRST);
        const booksExample2 = mapTimes(5, Book.FIFTH);
        const priceExample1 = PRICE * 10;
        const priceExample2 = PRICE * 5;

        expect(appController.calculatePrice(booksExample1)).toBe(priceExample1);
        expect(appController.calculatePrice(booksExample2)).toBe(priceExample2);
      });
    });

    describe('Complex Case: Test all books cases', () => {
      it('Case: 4 identicals books and 2 others"', () => {
        const booksExample = [mapTimes(4, Book.FIRST), Book.SECOND, Book.THIRD];

        const price = PRICE * 3 * DISCOUNT[3] + PRICE * 3;

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });

      it('Case: 2 identicals books and 4 others"', () => {
        const booksExample = [
          Book.FIRST,
          mapTimes(2, Book.SECOND),
          Book.THIRD,
          Book.FOURTH,
          Book.FIFTH,
        ];

        const price = PRICE * 5 * DISCOUNT[5] + PRICE;

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });

      it('Case: 3 sets of identicals books and 2 others"', () => {
        const booksExample = [
          mapTimes(10, Book.FIRST),
          mapTimes(8, Book.SECOND),
          mapTimes(6, Book.THIRD),
          Book.FOURTH,
          Book.FIFTH,
        ];

        const price =
          PRICE * 5 * DISCOUNT[5] * 1 +
          PRICE * 3 * DISCOUNT[3] * 5 +
          PRICE * 2 * DISCOUNT[2] * 2 +
          PRICE * 2;

        expect(appController.calculatePrice(booksExample)).toBeCloseTo(price);
      });

      it('Case: 5 sets of identicals books"', () => {
        const booksExample = [
          mapTimes(1, Book.FIRST),
          mapTimes(4, Book.SECOND),
          mapTimes(2, Book.THIRD),
          mapTimes(16, Book.FIFTH),
        ];

        const price =
          PRICE * 4 * DISCOUNT[4] * 1 +
          PRICE * 3 * DISCOUNT[3] * 1 +
          PRICE * 2 * DISCOUNT[2] * 2 +
          PRICE * 12;

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });
    });
  });
});
