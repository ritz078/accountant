import currencyData from "currency-codes/data";
import getSymbolFromCurrency from "currency-symbol-map";

export const currencies = currencyData
  .map((datum) => ({
    name: datum.currency,
    id: datum.code,
    symbol: getSymbolFromCurrency(datum.code),
  }))
  .filter((datum) => ["USD", "EUR", "INR"].includes(datum.id))
  .sort((a, b) => a.name.localeCompare(b.name));
