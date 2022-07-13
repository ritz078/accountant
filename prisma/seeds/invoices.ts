import { faker } from "@faker-js/faker";
import { taxes } from "./taxes";

export const invoices = new Array(150).fill(null).map(() => ({
  invoiceNumber: faker.datatype.number({ min: 100000, max: 999999 }),
  issueDate: faker.date.past(),
  dueDate: faker.date.future(),
  notes: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement<"draft" | "issued" | "paid" | "cancelled">(
    ["draft", "issued", "paid", "cancelled"]
  ),
  total: faker.datatype.number(200000),
  updatedAt: faker.date.recent(),
  items: new Array(2).fill(null).map(() => ({
    description: faker.lorem.sentence(),
    quantity: faker.datatype.number(5),
    unitPrice: faker.datatype.number(10000),
    name: faker.commerce.productName(),
    currencyCode: faker.finance.currencyCode(),
    taxes: [faker.helpers.arrayElement(taxes)],
  })) as any,
}));
