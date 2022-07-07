import { NextPage } from "next";
import React from "react";
import { Invoice } from "@/components/Invoice";
import { useRouter } from "next/router";
import { useInvoice } from "@/data/invoices";

const UpdateInvoice: NextPage<{
  setShowAddTaxForm: (show: boolean) => void;
  setShowAddCustomerForm: (show: boolean) => void;
}> = ({ setShowAddTaxForm, setShowAddCustomerForm }) => {
  const router = useRouter();
  const { id } = router.query;
  const invoiceId = parseInt(id as string, 10);
  const { data: invoice } = useInvoice(invoiceId);

  return invoiceId && !invoice ? null : (
    <Invoice
      setShowAddCustomerForm={setShowAddCustomerForm}
      setShowAddTaxForm={setShowAddTaxForm}
      invoice={invoice}
    />
  );
};

export default UpdateInvoice;
