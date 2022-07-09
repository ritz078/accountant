import React, { FC } from "react";
import { Input } from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { TextArea } from "./TextArea";
import { TaxDraft } from "@/types/tax";
import {
  createTaxPreset,
  updateTaxPreset,
  useTax,
  useTaxes,
} from "@/data/taxes";
import { Tax } from "@prisma/client";

export const AddTaxPreset: FC<{
  onClose: () => void;
  taxId?: number;
}> = ({ onClose, taxId }) => {
  const { mutate } = useTaxes();
  const { data: tax } = useTax(taxId);

  const formik = useFormik<TaxDraft | Tax>({
    initialValues: tax || {
      type: "percentage",
      name: "",
      value: 0,
      description: "",
    },
    onSubmit: async (values: TaxDraft) => {
      if (taxId) {
        await updateTaxPreset(values as Tax);
      } else {
        await createTaxPreset(values);
      }
      await mutate();
      onClose();
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      description: Yup.string(),
      value: Yup.number().required("Required"),
      type: Yup.string().required("Required"),
    }),
    enableReinitialize: !!taxId,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mt-6 flex-1 px-4 sm:px-6">
        <Input
          required
          name="name"
          label="Name"
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
          className="w-full"
          type="text"
          value={formik.values.name}
        />

        <div className="mt-3 flex flex-row justify-between gap-5">
          <Input
            required
            type="number"
            name="value"
            label="Value"
            className="w-full"
            value={formik.values.value}
            error={formik.touched.value && formik.errors.value}
            onChange={formik.handleChange}
          />

          <div className="w-full">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Value Type <span className="text-red-600">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className={classNames(
                "mt-1 block w-full rounded-md border-gray-200 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
                {
                  "text-red-500": formik.touched.type && formik.errors.type,
                }
              )}
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
        </div>

        <TextArea
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description || undefined}
          label="Description"
        />
      </div>
      <div className="flex flex-shrink-0 justify-end border-t px-4 py-4">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={() => formik.handleSubmit()}
          disabled={!formik.isValid}
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
