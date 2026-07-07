import { randomBytes } from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomCode(len: number): string {
  const bytes = randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i]! % ALPHABET.length];
  return out;
}

export function newReturnId(): string {
  return `RTN-${new Date().getFullYear()}-${randomCode(4)}`;
}

export function newQrToken(): string {
  return randomCode(24);
}

export function newBagCode(pointCode: string): string {
  return `BAG-${pointCode}-${randomCode(4)}`;
}
