import currencyData from "currency-codes/data";
import getSymbolFromCurrency from "currency-symbol-map";

export const currencies = currencyData
  .map((datum) => ({
    name: datum.currency,
    id: datum.code,
    symbol: getSymbolFromCurrency(datum.code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const getCurrencySymbol = (currency: string) =>
  getSymbolFromCurrency(currency);
