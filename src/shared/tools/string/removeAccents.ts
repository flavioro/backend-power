// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
