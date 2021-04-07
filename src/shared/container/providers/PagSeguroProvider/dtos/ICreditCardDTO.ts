import IHolder from './IHolderDTO';
import IInstallmentDTO from './IInstallmentDTO';

export default interface ICreditCardDTO {
  token: string; // get token credit card
  holder: IHolder;
  installment: IInstallmentDTO;
};
