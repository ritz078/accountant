import faker from "@faker-js/faker";
import { currency } from "./currency";

export const customers = new Array(6).fill(null).map(() => ({
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  vatin: null,
  gstin: "ABXDJ2365H",
  currencyCode: faker.random.arrayElement(currency.map((c) => c.code)),
  notes: faker.lorem.paragraph(),
  updatedAt: faker.date.recent(),
  address: {
    city: faker.address.city(),
    state: faker.address.state(),
    pin: faker.address.zipCode(),
    country: faker.address.country(),
    line1: faker.address.streetAddress(),
    line2: faker.address.streetAddress(),
    updatedAt: faker.date.recent(),
  },
}));
