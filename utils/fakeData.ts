import faker from "@faker-js/faker";
import { ICustomer } from "@/types/customer";
import { IInvoice, ITaxOrDiscount } from "@/types/invoice";
import { IItem } from "@/types/api/item";

export const invoices: IInvoice[] = new Array(15).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  invoiceNumber: faker.datatype.number(100),
  issueDate: faker.date.past(),
  dueDate: faker.date.future(),
  createdAt: faker.date.past(),
  customerId: faker.datatype.number(100),
  notes: faker.lorem.paragraph(),
  currencyCode: faker.finance.currencyCode(),
  taxes: new Array(2).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    value: faker.datatype.number(),
    type: faker.random.arrayElement(["percentage", "fixed"]),
  })),
  status: faker.random.arrayElement(["paid"]),

  total: faker.datatype.number(200000),
  items: new Array(5).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    description: faker.lorem.sentence(),
    quantity: faker.datatype.number(5),
    price: faker.datatype.number(10000),
    name: faker.commerce.productName(),
    currencyCode: faker.finance.currencyCode(),
    taxes: new Array(2).fill(null).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      value: faker.datatype.number(10),
      type: faker.random.arrayElement(["percentage", "fixed"]),
    })),
  })),
}));

export const items: IItem[] = new Array(5).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  description: faker.lorem.sentence(),
  quantity: faker.datatype.number(5),
  price: faker.datatype.number(10000),
  name: faker.commerce.productName(),
  currency: {
    id: faker.datatype.uuid(),
    name: faker.finance.currencyCode(),
    symbol: faker.finance.currencySymbol(),
  },
  taxes: new Array(2).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    value: faker.datatype.number(10),
    type: faker.random.arrayElement(["percentage", "fixed"]),
  })),
}));

export const customers: ICustomer[] = new Array(5).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  address: {
    city: faker.address.city(),
    state: faker.address.state(),
    pin: faker.address.zipCode(),
    country: faker.address.country(),
    line1: faker.address.streetAddress(),
    line2: faker.address.streetAddress(),
  },
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  vatin: faker.finance.iban(),
  gstin: faker.finance.iban(),
  currency: faker.finance.currencyCode(),
  notes: faker.lorem.paragraph(),
}));

export const taxPresets: ITaxOrDiscount[] = new Array(3).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  value: faker.datatype.number(10),
  type: faker.random.arrayElement(["percentage", "fixed"]),
}));
