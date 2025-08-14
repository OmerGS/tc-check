# turkish-id-validator

A Node.js & TypeScript package for validating Turkish citizens using **First Name**, **Last Name**, **Birth Year**, and **T.C. Kimlik Number** through both **local checksum validation** and the official **NVI SOAP API**.

---

## ✨ Features

- **Local validation** of T.C. Kimlik Number using checksum algorithm.
- **Official API verification** via [tckimlik.nvi.gov.tr](https://tckimlik.nvi.gov.tr/).
- **Batch verification** for multiple people at once.
- **TypeScript support** with full typings.
- **Fake T.C. Kimlik Number generator** for testing.
- **SOAP request handling** included (no external SOAP library required).

---

## 📦 Installation

```bash
npm install turkish-id-validator
```

---

## 🛠 Usage

### **1. Basic Validation (Local + API)**

```typescript
import { Validator, SoapService, APIService, VerificationService, Person } from 'turkish-id-validator';

// Create service instances
const validator = new Validator();
const soapService = new SoapService();
const apiService = new APIService(soapService);
const verificationService = new VerificationService(validator, apiService);

// Person to verify
const person: Person = {
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  birthYear: 1990,
  tc: '10000000146'
};

// Verify
verificationService.verify(person).then(result => {
  console.log(result); // { person: {...}, valid: true/false, message: "Valid" / "Invalid" }
});
```

---

### **2. Batch Verification**

```typescript
const people: Person[] = [
  { firstName: 'Ahmet', lastName: 'Yılmaz', birthYear: 1990, tc: '10000000146' },
  { firstName: 'Mehmet', lastName: 'Demir', birthYear: 1985, tc: '10000000138' }
];

verificationService.verifyBatch(people).then(results => {
  console.log(results);
});
```

---

### **3. Local Validation Only**

```typescript
const isValid = validator.validatePerson(person);
console.log(isValid); // true or false
```

---

### **4. Generate a Fake T.C. Number**

```typescript
const fakeTc = validator.generateFakeTC();
console.log(fakeTc); // Example: "12345678910"
```

---

## 📂 Project Structure

```
src/
 ├── types/
 │    ├── person.ts      # Person interface
 │    ├── result.ts      # Result interface
 ├── services/
 │    ├── validator.ts   # Local validation & fake TC generator
 │    ├── soapService.ts # SOAP XML creation & parsing
 │    ├── apiService.ts  # HTTPS request to NVI API
 │    ├── verificationService.ts # Main verification logic
 ├── index.ts            # Package exports
```

---

## 🔍 How It Works

1. **Validator**  
   Checks if the TC number follows the Turkish ID checksum rules.
   
2. **SOAP Envelope Creation**  
   Formats the person's info into a SOAP XML request.
   
3. **API Request**  
   Sends the SOAP request via HTTPS to the official government endpoint.
   
4. **Response Parsing**  
   Reads `<TCKimlikNoDogrulaResult>` from the XML and returns `true` or `false`.

---

## ⚠️ Notes

- Requires **Node.js ≥ 18**.
- API calls go through `https://tckimlik.nvi.gov.tr/` which may have rate limits or restrictions.
- **Do not use fake data for real API calls**; use `generateFakeTC()` only for local tests.

---

## 📜 License

MIT © [Omer GS](https://github.com/OmerGS)