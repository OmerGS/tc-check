import { Person } from './person';

export interface Result {
  person: Person;
  valid: boolean;
  message?: string;
}