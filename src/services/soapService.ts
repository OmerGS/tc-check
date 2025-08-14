import { Person } from '../types/person';

export interface ISOAPService {
  createEnvelope(person: Person): string;
  parseResponse(xml: string): boolean;
}

export class SoapService implements ISOAPService {
  createEnvelope(person: Person): string {
    return `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
          <TCKimlikNo>${person.tc}</TCKimlikNo>
          <Ad>${person.firstName.toUpperCase()}</Ad>
          <Soyad>${person.lastName.toUpperCase()}</Soyad>
          <DogumYili>${person.birthYear}</DogumYili>
        </TCKimlikNoDogrula>
      </soap12:Body>
    </soap12:Envelope>`;
  }

  parseResponse(xml: string): boolean {
    const match = xml.match(/<TCKimlikNoDogrulaResult>(.*?)<\/TCKimlikNoDogrulaResult>/);
    if (!match) throw new Error('Invalid response format');
    return match[1] === 'true';
  }
}