interface Country {
  name: string;
  id: number;
  isoCode: string;
  isoCodeThreeDigits: string;
}

interface Brand {
  name: string;
}

interface Bin {
  length?: any;
  country: Country;
  brand: Brand;
  bin: number;
  cvvSize: number;
  expirable: string;
  bank?: any;
  validationAlgorithm: string;
  cardLevel?: any;
  statusMessage: string;
  reasonMessage?: any;
}

export default interface IFlagCardReturnDTO {
  bin: Bin;
}
