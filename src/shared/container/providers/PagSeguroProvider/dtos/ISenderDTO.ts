import IPhoneDTO from './IPhoneDTO';
import IDocumentDTO from './IDocumentDTO';

export default interface ISenderDTO {
  name: string;
  email: number;
  phone: IPhoneDTO;
  document: IDocumentDTO;
};
