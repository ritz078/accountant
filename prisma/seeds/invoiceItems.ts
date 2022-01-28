import faker from "@faker-js/faker/index";
import { currency } from "./currency";

export const invoiceItems = new Array(5).fill(null).map(() => ({
  name: faker.commerce.productName(),
  quantity: faker.datatype.number({ min: 0, max: 50 }),
  description: faker.lorem.sentence(),
  unitPrice: faker.datatype.number({ min: 0, max: 5000 }),
  currencyCode: faker.random.arrayElement(currency.map((c) => c.code)),
  updatedAt: faker.date.recent(),
}));
