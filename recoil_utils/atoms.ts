import { HotpepperDataType } from "@/type";
import { atom } from "recoil";
import * as Location from "expo-location";

// 探す店の予算
export const priceSettingState = atom({
  key: "priceSetting",
  default: 0,
});

// 今いる場所か別の場所か
export const locationState = atom<"another" | "now">({
  key: "location",
  default: "another",
});

// 駅名
export const stationNameState = atom({
  key: "stationName",
  default: "",
});

// ホットペッパーAPIのデータ
export const hotpepperDataState = atom<HotpepperDataType[]>({
  key: "hotpepperData",
  default: [],
});

// 現在地の状態
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

// 経路のスタート位置の座標
export const startCoordsState = atom({
  key: "startCoords",
  default: {
    latitude: 35.6895,
    longitude: 139.6917,
  },
});
