import {formatPaymentType} from './BOUSpecificHelpers'
import { PaymentTypeOptions } from "../data/comboCategories";
const type = 'Eft';
const paymentTypes = PaymentTypeOptions.map((item) => item.value)

describe('BoU Specific Helpers', () => {
  it('type should be in paytment types', () => {
      expect(paymentTypes).toContain(type)
  });
  it('Should print the human readable name', () => {
    expect(formatPaymentType(type)).toEqual('Electronic Funds Transfer (EFT)')
  });
});