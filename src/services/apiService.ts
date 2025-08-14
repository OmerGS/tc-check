import https from 'https';
import { Person } from '../types/person';
import { Result } from '../types/result';
import { ISOAPService } from './soapService';

export interface IAPIService {
  verifyPerson(person: Person): Promise<Result>;
}

export class APIService implements IAPIService {
  private soapService: ISOAPService;
  private serviceUrl = 'tckimlik.nvi.gov.tr';
  private servicePath = '/service/kpspublic.asmx';

  constructor(soapService: ISOAPService) {
    this.soapService = soapService;
  }

  verifyPerson(person: Person): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
      const soapEnvelope = this.soapService.createEnvelope(person);
      const options = {
        hostname: this.serviceUrl,
        port: 443,
        path: this.servicePath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/soap+xml; charset=utf-8',
          'Content-Length': Buffer.byteLength(soapEnvelope),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const valid = this.soapService.parseResponse(data);
            resolve({ person, valid, message: valid ? 'Valid' : 'Invalid' });
          } catch (err: any) {
            reject(err);
          }
        });
      });

      req.on('error', (err) => reject(err));
      req.write(soapEnvelope);
      req.end();
    });
  }
}