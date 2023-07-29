export const convertToUrl = (str: string) => {
  if (!str) return '';
  const replaceSpaces = str.replaceAll(' ', '-');
  return replaceSpaces.toLowerCase();
};

export function hourDiff(dt2: Date, dt1: Date) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export function padBuffer(addr: string) {
  return Buffer.from(addr.substr(2).padStart(32 * 2, '0'), 'hex');
}

export function stringToBytes32(value: string) {
  return Array.from(Buffer.from(value.substr(2), 'hex')) as any;
}
