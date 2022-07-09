import React, { createContext } from "react";
import { Customer, Tax } from "@prisma/client";

export enum SlideOverType {
  NONE,
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  ADD_TAX_PRESET,
  EDIT_TAX_PRESET,
  ADD_ITEM,
  EDIT_ITEM,
}

export const SlideOverContext = createContext<{
  setSlideOver: React.Dispatch<
    React.SetStateAction<{
      type: SlideOverType;
      payload?: number;
    }>
  >;
  type: SlideOverType;
  payload?: number;
}>({
  type: SlideOverType.NONE,
  setSlideOver: () => {},
});
