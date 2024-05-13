import { HotpepperDataType } from "@/type";
import { atom } from "recoil";

export const priceSettingState = atom({
  key: "priceSetting",
  default: 0,
});

export const locationState = atom<"another" | "now">({
  key: "location",
  default: "another",
});

export const stationNameState = atom({
  key: "stationName",
  default: "",
});

export const hotpepperDataState = atom<HotpepperDataType[]>({
  key: "hotpepperData",
  default: [],
});
