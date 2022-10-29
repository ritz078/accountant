import React from "react";
import { Invoice } from "@/components/Invoice";
import { useInvoice } from "@/data/invoices";

const UpdateInvoice = ({ params }: { params: { slug: string } }) => {
  const invoiceId = parseInt(params.slug as string, 10);
  const { data: invoice } = useInvoice(invoiceId);

  return invoiceId && !invoice ? null : <Invoice invoice={invoice} />;
};

export default UpdateInvoice;
