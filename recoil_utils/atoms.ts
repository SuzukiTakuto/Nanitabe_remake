import { HotpepperDataType } from "@/type";
import { atom } from "recoil";
import * as Location from "expo-location";

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

export const nowLocationState = atom<Location.LocationObject>({
  key: "nowLocation",
  default: {
    coords: {
      latitude: 35.6895,
      longitude: 139.6917,
      altitudeAccuracy: 0,
      altitude: 0,
      accuracy: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: 0,
  },
});
