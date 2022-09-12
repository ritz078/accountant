import { faker } from "@faker-js/faker";

export const customers = new Array(6).fill(null).map(() => ({
  name: faker.name.findName(),
  phone: faker.phone.number(),
  email: faker.internet.email().toLowerCase(),
  vatin: null,
  gstin: faker.finance.account(),
  notes: faker.lorem.paragraph(),
  updatedAt: faker.date.recent(),
  logo: faker.internet.avatar(),
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
