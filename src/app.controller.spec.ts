import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book, Discount, PRICE } from './types';
import * as _ from 'lodash';

describe('AppController', () => {
  let appController: AppController;

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
        const price = PRICE * 2 * Discount.TWOBOOKS;

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });
      it('Case: 3 BOOKS"', () => {
        const booksExample1 = [Book.FOURTH, Book.FIFTH, Book.FIRST];
        const booksExample2 = [Book.THIRD, Book.SECOND, Book.FIRST];
        const price = PRICE * 3 * Discount.THREEBOOKS;

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });
      it('Case: 4 BOOKS"', () => {
        const booksExample = [Book.FOURTH, Book.FIFTH, Book.FIRST, Book.SECOND];
        const price = 8 * 4 * Discount.FOURBOOKS;

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
        const price = 8 * 5 * Discount.ALLBOOKS;

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });
    });

    describe('Simple Case: Test identical Books', () => {
      it('Case: many identical BOOKS"', () => {
        const booksExample1 = _.times(10, Book.FIRST);
        const booksExample2 = _.times(5, Book.FIFTH);
        const priceExample1 = PRICE * 10;
        const priceExample2 = PRICE * 5;

        expect(appController.calculatePrice(booksExample1)).toBe(priceExample1);
        expect(appController.calculatePrice(booksExample2)).toBe(priceExample2);
      });
    });

    // describe('Complex Case: Test all books cases', () => {

    // });
  });
});
