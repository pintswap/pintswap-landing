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

export function minutesDiff(dateTimeValue2: Date, dateTimeValue1: Date) {
  let differenceValue =
    (dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
  differenceValue /= 60;
  return Math.abs(Math.round(differenceValue));
}

export function padBuffer(addr: string) {
  return Buffer.from(addr.substr(2).padStart(32 * 2, '0'), 'hex');
}

export function stringToBytes32(value: string) {
  return Array.from(Buffer.from(value.substr(2), 'hex')) as any;
}

export function truncate(s: string, amount?: number) {
  if (!s) return s;
  if (s.match(/\.drip$/)) return s;
  return `${s.slice(0, amount || 4)}...${s.slice(amount ? amount * -1 : -4)}`;
}
