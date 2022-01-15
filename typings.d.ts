declare module "currency-codes/data" {
  declare const codes: {
    code: string;
    currency: string;
    number: number;
  }[];

  export default codes;
}

declare module "@faker-js/faker" {
  import faker from "faker";
  export default faker;
}
