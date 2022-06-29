import { PrismaClient } from "@prisma/client";
import { customers } from "./seeds/customers";
import { currency } from "./seeds/currency";
import { taxes } from "./seeds/taxes";
import { invoiceItems } from "./seeds/invoiceItems";
import { faker } from "@faker-js/faker";
import { invoices } from "./seeds/invoices";

const prisma = new PrismaClient();

async function main() {
  await prisma.tax.createMany({
    data: taxes,
  });

  await prisma.currency.createMany({
    data: currency,
    skipDuplicates: true,
  });

  const savedTaxes = await prisma.tax.findMany();

  await Promise.all(
    invoiceItems.map((item) => {
      return prisma.invoiceItem.create({
        data: {
          ...item,
          taxes: {
            connect: [
              {
                id: faker.helpers.arrayElement(savedTaxes).id,
              },
            ],
          },
          currency: {
            connect: {
              code: faker.helpers.arrayElement(currency).code,
            },
          },
        },
      });
    })
  );

  await Promise.all(
    customers.map(({ address, ...customer }) =>
      prisma.customer.create({
        data: {
          ...customer,
          address: {
            create: address,
          },
          currency: {
            connect: {
              code: faker.helpers.arrayElement(currency).code,
            },
          },
        },
      })
    )
  );

  const savedCustomers = await prisma.customer.findMany();

  await Promise.all(
    invoices.map((invoice) =>
      prisma.invoice.create({
        data: {
          ...invoice,
          customer: {
            connect: {
              id: faker.helpers.arrayElement(savedCustomers).id,
            },
          },
          taxes: {
            connect: [
              {
                id: faker.helpers.arrayElement(savedTaxes).id,
              },
            ],
          },
          currency: {
            connect: {
              code: faker.helpers.arrayElement(currency).code,
            },
          },
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
