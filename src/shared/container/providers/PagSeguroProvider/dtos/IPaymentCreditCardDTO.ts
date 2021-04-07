import ISender from './ISenderDTO';
import IBillingDTO from './IBillingDTO';
import IItemDTO from './IItemDTO';
import ICreditCardDTO from './ICreditCardDTO';

export default interface IPaymentCreditCardDTO {
  method: string;
  reference: string;
  sender: ISender;
  billing: IBillingDTO;
  items: IItemDTO[];
  creditCard: ICreditCardDTO;
};


// interface ITemplateVariables {
//   [key: string]: string | number;
// }

// export default interface IPaymentDTO {
//   variables: ITemplateVariables;
// }
