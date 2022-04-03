import request from 'supertest';
import { GetInvoicesUseCase } from '../../domain/interfaces/use-cases/invoice/get-invoices';
import InvoiceRouter from './invoice-router';
import server from '../../infrastructure/server';
import { IInvoiceResponse } from '@vank/shared-types';

class MockGetInvoicesUseCase implements GetInvoicesUseCase {
  execute(): Promise<IInvoiceResponse[]> {
    throw new Error('Method not implemented');
  }
}

describe('Invoice router', () => {
  let mockGetInvoicesUseCase: MockGetInvoicesUseCase;

  beforeAll(() => {
    mockGetInvoicesUseCase = new MockGetInvoicesUseCase();
    server.use('/invoice', InvoiceRouter(mockGetInvoicesUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /invoice', () => {
    test('GET /invoice/:internalCode should return the data', async () => {
      const invoicesData = [
        {
          invoiceId: 1,
          vendorId: 34,
          invoiceNumber: 'QP58872',
          invoiceTotal: 116.54,
          paymentTotal: 116.54,
          creditTotal: 0,
          bankId: 4,
        },
      ];
      jest
        .spyOn(mockGetInvoicesUseCase, 'execute')
        .mockImplementation(() => Promise.resolve(invoicesData));
      const response = await request(server).get('/invoice/test-1');
      expect(response.body).toStrictEqual(invoicesData);
      expect(response.status).toBe(200);
    });

    test('GET /invoice returns 500 on use case error', async () => {
      jest
        .spyOn(mockGetInvoicesUseCase, 'execute')
        .mockImplementation(() =>
          Promise.reject(Error('error requesting invoices'))
        );
      const response = await request(server).get('/invoice/test-1');
      expect(response.body.message).toBe('error requesting invoices');
      expect(response.status).toBe(500);
    });
  });

  describe('GET /invoice/:internalCode with query params', () => {
    test('use invalid params should fail', async () => {
      const expectedError = {
        errors: [
          {
            value: 'string',
            msg: 'Invalid value',
            param: 'vendor',
            location: 'query',
          },
          {
            value: '1',
            msg: 'Invalid invoiceDate range',
            param: 'invoiceDate',
            location: 'query',
          },
          {
            value: '20',
            msg: 'currency is not valid',
            param: 'currency',
            location: 'query',
          },
        ],
      };

      const response = await request(server).get(
        '/invoice/test-1?vendor=string&invoiceDate=1&currency=20'
      );

      expect(response.body).toStrictEqual(expectedError);
      expect(response.status).toBe(400);
    });

    describe('use invalid invoiceDate value', () => {
      test("should failed if invoiceDate elements aren't 2", async () => {
        const expectedErrors = [
          {
            value: 'date1,date2,date3',
            msg: 'Invalid invoiceDate range',
            param: 'invoiceDate',
            location: 'query',
          },
        ];

        const response = await request(server).get(
          '/invoice/test-1?invoiceDate=date1,date2,date3'
        );

        expect(response.body.errors).toStrictEqual(expectedErrors);
        expect(response.status).toBe(400);
      });

      test('should failed if startDate > endDate', async () => {
        const expectedErrors = [
          {
            value: '25-FEB-16,25-FEB-12',
            msg: 'startDate must be less than endDate',
            param: 'invoiceDate',
            location: 'query',
          },
        ];

        const startDate = '25-FEB-16';
        const endDate = '25-FEB-12';
        const response = await request(server).get(
          `/invoice/test-1?invoiceDate=${startDate},${endDate}`
        );

        expect(response.body.errors).toStrictEqual(expectedErrors);
        expect(response.status).toBe(400);
      });

      test('should return data if invoiceDate is valid', async () => {
        const startDate = '25-FEB-12';
        const endDate = '25-FEB-16';

        const invoicesData = [
          {
            invoiceId: 1,
            vendorId: 34,
            invoiceNumber: 'QP58872',
            invoiceTotal: 116.54,
            paymentTotal: 116.54,
            creditTotal: 0,
            bankId: 4,
          },
        ];

        jest
          .spyOn(mockGetInvoicesUseCase, 'execute')
          .mockImplementation(() => Promise.resolve(invoicesData));

        const response = await request(server).get(
          `/invoice/test-1?invoiceDate=${startDate},${endDate}`
        );

        expect(response.body).toStrictEqual(invoicesData);
        expect(response.status).toBe(200);
      });
    });
  });
});
