import { Person } from '../types/person';

export interface IValidator {
  validatePerson(person: Person): boolean;
}

export class Validator implements IValidator {
  validatePerson(person: Person): boolean {
    const tc = person.tc;
    if (!tc || tc.length !== 11 || !/^\d+$/.test(tc) || tc[0] === '0') return false;
    const digits = tc.split('').map(Number);
    const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
    const check1 = (sumOdd * 7 - sumEven) % 10;
    const check2 = (sumOdd + sumEven + check1) % 10;
    return check1 === digits[9] && check2 === digits[10];
  }

  generateFakeTC(): string {
    const digits: number[] = [];
    digits[0] = Math.floor(Math.random() * 9) + 1;
    for (let i = 1; i < 9; i++) digits[i] = Math.floor(Math.random() * 10);
    const sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const sumEven = digits[1] + digits[3] + digits[5] + digits[7];
    digits[9] = (sumOdd * 7 - sumEven) % 10;
    digits[10] = (sumOdd + sumEven + digits[9]) % 10;
    return digits.join('');
  }
}