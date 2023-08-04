import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Book, Discount } from './types';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('Test Function calculatePrice', () => {
    describe('Test differents Books', () => {
      it('Case: 1 BOOK"', () => {
        const booksExample1 = [Book.FOURTH];
        const booksExample2 = [Book.THIRD];
        const price = 8;

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });
      it('Case: 2 BOOKS"', () => {
        const booksExample1 = [Book.FOURTH, Book.FIFTH];
        const booksExample2 = [Book.THIRD, Book.SECOND];
        const price = 8 * 2 * Discount.TWOBOOKS;

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });

      it('Case: 3 BOOKS"', () => {
        const booksExample1 = [Book.FOURTH, Book.FIFTH, Book.FIRST];
        const booksExample2 = [Book.THIRD, Book.SECOND, Book.FIRST];
        const price = 8 * 2 * Discount.THREEBOOKS;

        expect(appController.calculatePrice(booksExample1)).toBe(price);
        expect(appController.calculatePrice(booksExample2)).toBe(price);
      });

      it('Case: 4 BOOKS"', () => {
        const booksExample = [Book.FOURTH, Book.FIFTH, Book.FIRST, Book.SECOND];
        const price = 8 * 2 * Discount.FOURBOOKS;

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });

      it.only('Case: All BOOKS"', () => {
        const booksExample = [
          Book.FIRST,
          Book.SECOND,
          Book.THIRD,
          Book.FOURTH,
          Book.FIFTH,
        ];
        const price = 8 * 2 * Discount.ALLBOOKS;

        expect(appController.calculatePrice(booksExample)).toBe(price);
      });
    });
  });
});
