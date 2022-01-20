import faker from "@faker-js/faker";
import { IInvoice, IItem, ITaxOrDiscount } from "../pages/create-invoice";

export const invoices: IInvoice[] = new Array(10).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  invoiceNumber: faker.datatype.number(100),
  issueDate: faker.date.past(),
  dueDate: faker.date.future(),
  createdAt: faker.date.past(),
  customer: {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  },
  notes: faker.lorem.paragraph(),
  currency: {
    id: faker.datatype.uuid(),
    name: faker.finance.currencyCode(),
    symbol: "$",
  },
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

export const customers = new Array(5).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
  country: faker.address.country(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
}));

export const taxPresets: ITaxOrDiscount[] = new Array(3).fill(null).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  value: faker.datatype.number(10),
  type: faker.random.arrayElement(["percentage", "fixed"]),
}));
