import React, { FC } from "react";
import { Input } from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

export const AddTaxPreset: FC = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      type: "percentage",
      name: "",
      value: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      value: Yup.number().required("Required"),
      type: Yup.string().required("Required"),
    }),
    validateOnMount: true,
  });

  console.log(formik);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-6 relative flex-1 px-4 sm:px-6">
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

        <div className="flex flex-row justify-between gap-5 mt-3">
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
                "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
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
      </div>
      <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t">
        <button
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          disabled={!formik.isValid}
          type="submit"
          className={classNames(
            "ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            {
              "opacity-50 cursor-not-allowed": !formik.isValid,
            }
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
};
