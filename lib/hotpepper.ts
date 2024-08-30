//import { HOTPEPPER_API_KEY } from "@env";
import { XMLParser } from "fast-xml-parser";

export const fetchSurroundingData = async (
  price: number,
  coords: {
    latitude: number;
    longitude: number;
  }
) => {
  const xp = new XMLParser();

  const reqURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.EXPO_PUBLIC_HOTPEPPER_API_KEY}&range=2&count=100&lat=${coords.latitude}&lng=${coords.longitude}`;

  try {
    const res = await fetch(reqURL);
    const data = await res.text();
    const jObj = xp.parse(data);
    const beforeFilterShops = Array.isArray(jObj.results.shop)
      ? jObj.results.shop
      : [jObj.results.shop];
    const shops = beforeFilterShops.filter((shop: any) => {
      const maxPrice = getMaxPrice(shop.budget.name);

      return maxPrice <= price;
    });
    return shops;
  } catch (error) {
    return error;
  }
};

export const fetchStationSurroundingData = async (
  price: number,
  station: string
) => {
  const xp = new XMLParser();

  const reqURL = `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.EXPO_PUBLIC_HOTPEPPER_API_KEY}&range=2&count=100&keyword=${station}`;

  try {
    const res = await fetch(reqURL);
    const data = await res.text();
    const jObj = xp.parse(data);
    const beforeFilterShops = Array.isArray(jObj.results.shop)
      ? jObj.results.shop
      : [jObj.results.shop];
    const shops = beforeFilterShops.filter((shop: any) => {
      const maxPrice = getMaxPrice(shop.budget.name);

      return maxPrice <= price;
    });

    return shops;
  } catch (error) {
    return error;
  }
};

const getMaxPrice = (priceRange: string) => {
  const price = priceRange.split("円")[0].split("～")[1];

  return Number(price);
};
