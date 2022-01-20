import { onRenderOptionDefault, Select } from "./Select";
import { FC } from "react";
import { currencies } from "../../utils/currency";

export const CurrencySelect: FC<ICurrencySelect> = ({
  onChange,
  value,
  label,
}) => {
  return (
    <Select<ICurrency>
      required={!!label}
      label={label}
      placeholder={`Select currency`}
      onChange={onChange}
      options={currencies}
      value={value}
      onRenderLabel={(selected) =>
        selected ? (
          <div className="flex flex-row items-center">
            <div
              className={`currency-flag flex shrink-0 rounded-sm currency-flag-${selected?.id?.toLocaleLowerCase()} mr-2`}
            />{" "}
            {selected?.name}
          </div>
        ) : null
      }
      onRenderOption={(option, options) => (
        <div className="flex flex-row items-center">
          <div
            className={`currency-flag flex shrink-0 rounded-sm currency-flag-${option.id?.toLocaleLowerCase()} mr-2`}
          />{" "}
          {onRenderOptionDefault(option, options)}
        </div>
      )}
    />
  );
};

export interface ICurrency {
  symbol?: string;
  name: string;
  id: string;
}

interface ICurrencySelect {
  onChange: (value: ICurrency) => void;
  value: ICurrency;
  label?: string;
}
