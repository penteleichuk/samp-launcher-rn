import { encode } from 'ini';

interface StringifyIniOptions {
  pretty?: boolean;
}

export const stringifyIni = (data: any, options?: StringifyIniOptions) => {
  const { pretty } = { pretty: false, ...options };
  return encode(data, { whitespace: pretty });
};
