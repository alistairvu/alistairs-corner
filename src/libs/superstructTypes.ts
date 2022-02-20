import { validate as validateEmail } from 'isemail';
import { define } from 'superstruct';

export const email = () =>
  define<string>('email', (val) => validateEmail(String(val)));
