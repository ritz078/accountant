import { Currency } from "@prisma/client";

export interface IMetaResponse {
  currencies: Currency[];
}
