import { PaymentTypeOptions } from "../data/comboCategories";

//Prints the human readable name of a payment type and not the machine name
export const formatPaymentType = (type: string) => {
    return PaymentTypeOptions
            .filter(item => item.value === type)
            .map(item => item.label )
            .toString();
};