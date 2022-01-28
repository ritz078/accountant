import faker from "@faker-js/faker/index";

export const taxes = new Array(8).fill(null).map(() => ({
  name: faker.commerce.productName(),
  value: faker.datatype.number({ min: 0, max: 100 }),
  type: faker.random.arrayElement<"percentage" | "fixed">([
    "percentage",
    "fixed",
  ]),
  updatedAt: faker.date.recent(),
}));
