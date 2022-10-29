"use client";

import { NextPage } from "next";
import { Input } from "@/components/Input";
import { useFormik } from "formik";
import { Address, User } from "@prisma/client";
import * as Yup from "yup";

const Account: NextPage = () => {
  const formik = useFormik<
    User & {
      address: Address;
    }
  >({
    onSubmit: (values) => {},
    initialValues: {
      address: {},
    },
    validationSchema: Yup.object({
      gstin: Yup.string()
        .matches(
          /d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
          "Invalid GSTIN"
        )
        .required("Required"),
    }),
  });

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 bg-white pb-3 shadow sm:rounded-lg">
          <div className="bg-white sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-b sm:border-gray-200  sm:p-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="bg-white sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-b sm:border-gray-200  sm:p-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Email
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="bg-gray-50 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-b sm:border-gray-200 sm:p-4">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              GSTIN
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                name="gstin"
                onChange={formik.handleChange}
                value={formik.values.gstin}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.gstin &&
                  formik.errors.gstin &&
                  !!formik.values.gstin?.length
                }
              />
            </div>
          </div>

          <div className="bg-white p-4">
            <Input
              name="address.line1"
              value={formik.values.address.line1}
              onChange={formik.handleChange}
              label="Address"
              placeholder="Line 1"
              required
            />
            <Input
              name="address.line2"
              value={formik.values.address.line2}
              onChange={formik.handleChange}
              placeholder="Line 2"
              className="mt-3"
            />

            <div className="mt-3 flex flex-1 flex-row gap-4">
              <Input
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                label="City"
                className="mt-3"
                required
              />
              <Input
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                label="State"
                className="mt-3"
                required
              />
            </div>
            <div className="mt-3 flex flex-1 flex-row gap-4">
              <Input
                name="address.pin"
                value={formik.values.address.pin}
                onChange={formik.handleChange}
                label="Zip"
                className="mt-3"
                required
              />
              <Input
                name="address.country"
                value={formik.values.address.country}
                onChange={formik.handleChange}
                label="Country"
                className="mt-3"
                required
              />
            </div>
          </div>

          <button
            type="button"
            className="float-right mr-4 flex inline-flex items-center self-end rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
