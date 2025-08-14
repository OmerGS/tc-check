import { Person } from '../types/person';
import { Result } from '../types/result';
import { IAPIService } from './apiService';
import { IValidator } from './validator';

export class VerificationService {
  constructor(
    private validator: IValidator,
    private apiService: IAPIService
  ) {}

  async verify(person: Person): Promise<Result> {
    if (!this.validator.validatePerson(person)) {
      return { person, valid: false, message: 'Local validation failed' };
    }
    return this.apiService.verifyPerson(person);
  }

  async verifyBatch(persons: Person[]): Promise<Result[]> {
    return Promise.all(persons.map(p => this.verify(p)));
  }
}