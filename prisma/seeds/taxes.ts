import { faker } from "@faker-js/faker";

export const taxes = new Array(4).fill(null).map(() => ({
  name: faker.commerce.productName(),
  value: faker.datatype.number({ min: 0, max: 100 }),
  type: faker.helpers.arrayElement<"percentage" | "fixed">([
    "percentage",
    "fixed",
  ]),
  description: faker.lorem.sentence(),
  updatedAt: faker.date.recent(),
}));
