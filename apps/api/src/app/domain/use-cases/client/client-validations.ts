import { body } from 'express-validator';
import { IClient } from '@vank/shared-types';

export function getClientValidations() {
  return [
    body('companyName').isString().isLength({ max: 80 }),
    body('internalCode').isString().isLength({ max: 80 }),
    body('tributaryId').isString().isLength({ max: 80 }),
    body('currency').custom(validateCurrency),
    body('monthlyApiCallsFee').isInt(),
    body('allowedBanks').isArray().notEmpty().isInt(),
  ];
}

export function getFilteredClient(requestBody: IClient): IClient {
  return {
    companyName: requestBody.companyName,
    internalCode: requestBody.internalCode,
    tributaryId: requestBody.tributaryId,
    currency: requestBody.currency,
    monthlyApiCallsFee: requestBody.monthlyApiCallsFee,
    allowedBanks: requestBody.allowedBanks,
  };
}

function validateCurrency(value) {
  if (!['CLP', 'USD', 'EUR'].includes(value))
    throw new Error('currency is not valid');
  return true;
}
