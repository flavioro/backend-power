function isValidItemEnum(typeRegister: string, typeEnum: Object) {
  const typeRegisterEnum = typeRegister as typeof typeEnum;

  // ok isValid return name propriety
  // for (const value in TipoCadastroEnum) {
  // }
  // function log(value: string) {
  //   // if (!isNaN(Number(value))) {
  //   //   return;
  //   // }

  // }

  // function log(value: typeof typeEnum) {
  // }

  let isValid = false;
  for (const value of enumKeys(typeEnum)) {
    if (typeEnum[value] === typeRegisterEnum) {
      isValid = true;
      break;
    }
  }

  return isValid;
}

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

export default {
  isValidItemEnum,
};
