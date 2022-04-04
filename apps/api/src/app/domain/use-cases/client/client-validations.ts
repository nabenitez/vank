import { body } from 'express-validator';
import { IClient, IClientUpdate } from '@vank/shared-types';
import { validateCurrency } from '@vank/request-validator';

export function getCreateClientValidations() {
  return [
    body('companyName').isString().isLength({ max: 80 }),
    body('internalCode').isString().isLength({ max: 80 }),
    body('tributaryId').isString().isLength({ max: 80 }),
    body('currency').custom(validateCurrency),
    body('monthlyApiCallsFee').isInt(),
    body('allowedBanks').isArray().notEmpty().isInt(),
  ];
}

export function getUpdateClientValidations() {
  return [
    body('internalCode').isString().notEmpty(),
    body('tributaryId').isString().isLength({ max: 80 }).optional(),
    body('currency').custom(validateCurrency).optional(),
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

export function getFilteredClientUpdate(
  requestBody: IClientUpdate
): IClientUpdate {
  return {
    internalCode: requestBody.internalCode,
    tributaryId: requestBody.tributaryId,
    currency: requestBody.currency,
  };
}
