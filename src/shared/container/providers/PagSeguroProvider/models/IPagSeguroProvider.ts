import IGetInstallmentDTO from '../dtos/IGetInstallmentDTO';
import IFlagCardReturnDTO from '../dtos/IFlagCardReturnDTO';

export default interface IPagSeguroProvider {
  boleto(file: string): Promise<string>;
  creditCard(file: string): Promise<string>;
  flagCard(bin: number): Promise<IFlagCardReturnDTO>;
  installment(installments: IGetInstallmentDTO): Promise<string>;
}
