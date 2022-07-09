import * as Yup from "yup";

export const customerInitialValue = {
  name: "",
  email: null,
  phone: null,
  currencyCode: "INR",
  address: {
    line1: "",
    line2: null,
    city: "",
    state: "",
    pin: "",
    country: "",
  },
  notes: null,
  vatin: null,
  gstin: null,
  logo: "",
};

export const customerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.object().shape({
    line1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pin: Yup.string().required("Pin is required"),
    country: Yup.string().required("Country is required"),
  }),
  currencyCode: Yup.string().required("Currency is required"),
});
