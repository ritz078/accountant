import { onRenderOptionDefault, Select } from "./Select";
import { FC } from "react";
import { ICurrency } from "@/types/currency";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { IMeta } from "@/types/api/meta";

export const CurrencySelect: FC<ICurrencySelect> = ({
  onChange,
  value,
  label,
}) => {
  const { data } = useSWR<IMeta>("/api/meta", fetcher);
  if (!data) return null;

  const selected = data.currencies.find((c) => c.code === value);

  return (
    <Select<ICurrency>
      required={!!label}
      label={label}
      placeholder={`Select currency`}
      onChange={onChange}
      options={data.currencies}
      value={selected}
      onRenderLabel={(selected) =>
        selected ? (
          <div className="flex flex-row items-center">
            <div
              className={`currency-flag flex shrink-0 rounded-sm currency-flag-${selected?.code?.toLocaleLowerCase()} mr-2`}
            />{" "}
            {selected?.name}
          </div>
        ) : null
      }
      onRenderOption={(option, options) => (
        <div className="flex flex-row items-center">
          <div
            className={`currency-flag flex shrink-0 rounded-sm currency-flag-${option.code?.toLocaleLowerCase()} mr-2`}
          />{" "}
          {onRenderOptionDefault(option, options)}
        </div>
      )}
    />
  );
};

interface ICurrencySelect {
  onChange: (value: ICurrency) => void;
  value: string;
  label?: string;
}
