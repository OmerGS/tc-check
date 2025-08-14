import { Validator, SoapService, APIService, VerificationService, Person, } from './index';

const validator = new Validator();
const soap = new SoapService();
const api = new APIService(soap);
const service = new VerificationService(validator, api);

const fakeTc = validator.generateFakeTC();
const person: Person = { firstName: 'Ali', lastName: 'Veli', birthYear: 1995, tc: fakeTc };

service.verify(person)
  .then(result => console.log(result))
  .catch(err => console.error(err));