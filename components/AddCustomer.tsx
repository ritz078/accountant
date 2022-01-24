import { Input } from "./Input";
import React, { FC } from "react";
import classNames from "classnames";
import { CurrencySelect } from "./Select/CurrencySelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ICustomerNew } from "@/types/customer";

export const AddCustomer: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const formik = useFormik<ICustomerNew>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      currencyCode: "INR",
      address: {
        line1: "",
        city: "",
        state: "",
        pin: "",
        country: "",
      },
      notes: "",
      vatin: "",
      gstin: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      address: Yup.object().shape({
        line1: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        pin: Yup.string().required("Pin is required"),
        country: Yup.string().required("Country is required"),
      }),
      currency: Yup.object().shape({
        id: Yup.string().required("Currency is required"),
        name: Yup.string().required("Currency is required"),
        symbol: Yup.string().required("Currency is required"),
      }),
    }),
    validateOnMount: true,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mt-6 flex-1 px-4 sm:px-6">
        <Input
          required
          label="Company Name"
          name="name"
          type="text"
          className="flex flex-1 flex-col"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
        />

        <div className="mt-3 flex flex-1 flex-row gap-4">
          <Input
            label="Company Email"
            name="email"
            type="email"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />

          <Input
            label="Company Phone"
            name="phone"
            type="tel"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.touched.phone && formik.errors.phone}
          />
        </div>

        <Input
          required
          label="Address"
          name="address.line1"
          type="text"
          className="mt-3 flex flex-1 flex-col"
          onChange={formik.handleChange}
          value={formik.values.address?.line1}
          error={formik.touched.address?.line1 && formik.errors.address?.line1}
        />

        <Input
          required
          name="address.line2"
          type="text"
          className="mt-3 flex flex-1 flex-col"
          onChange={formik.handleChange}
          value={formik.values.address?.line2}
          error={formik.touched.address?.line2 && formik.errors.address?.line2}
        />

        <div className="mt-3 flex flex-1 flex-row gap-4">
          <Input
            required
            label="City"
            name="address.city"
            type="text"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.address?.city}
            error={formik.touched.address?.city && formik.errors.address?.city}
          />
          <Input
            required
            label="State"
            name="address.state"
            type="text"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.address?.state}
            error={
              formik.touched.address?.state && formik.errors.address?.state
            }
          />
        </div>

        <div className="mt-3 flex flex-1 flex-row gap-4">
          <Input
            required
            label="Postal / Zip Code"
            name="address.pin"
            type="text"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.address?.pin}
            error={formik.touched.address?.pin && formik.errors.address?.pin}
          />
          <Input
            required
            label="Country"
            name="address.country"
            type="text"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.address?.country}
            error={
              formik.touched.address?.country && formik.errors.address?.country
            }
          />
        </div>

        <div className="mt-3">
          <CurrencySelect
            label="Currency"
            onChange={(currency) => {
              formik.setFieldValue("currency", currency);
            }}
            value={formik.values.currencyCode}
          />
        </div>

        <div className="mt-3 flex flex-1 flex-row gap-4">
          <Input
            label="VAT Number"
            name="vatin"
            type="text"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.vatin}
            error={formik.touched.vatin && formik.errors.vatin}
          />

          <Input
            label="GSTIN"
            name="gstin"
            type="text"
            className="flex flex-1 flex-col"
            onChange={formik.handleChange}
            value={formik.values.gstin}
            error={formik.touched.gstin && formik.errors.gstin}
          />
        </div>
      </div>

      <div className="flex flex-shrink-0 justify-end border-t px-4 py-4">
        <button
          onClick={onClose}
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={classNames(
            "ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            {
              "cursor-not-allowed opacity-50": !formik.isValid,
            }
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
};
