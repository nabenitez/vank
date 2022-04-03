// https://express-validator.github.io/docs/running-imperatively.html
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// parallel processing
export function validate(validations) {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}

export function validateCurrency(value) {
  /* istanbul ignore next */
  if (!['CLP', 'USD', 'EUR'].includes(value))
    //needs E2E tests
    /* istanbul ignore next */
    throw new Error('currency is not valid');
  return true;
}
