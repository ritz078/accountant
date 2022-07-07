import { NextPage } from "next";
import React from "react";
import { Invoice } from "@/components/Invoice";

const CreateInvoice: NextPage<{
  setShowAddTaxForm: (show: boolean) => void;
  setShowAddCustomerForm: (show: boolean) => void;
}> = ({ setShowAddTaxForm, setShowAddCustomerForm }) => {
  return (
    <Invoice
      setShowAddCustomerForm={setShowAddCustomerForm}
      setShowAddTaxForm={setShowAddTaxForm}
    />
  );
};

export default CreateInvoice;
