import { Coords, RoutesObject } from "@/type";
import { EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN } from "@env";
import { XMLParser } from "fast-xml-parser";

const env = process.env;
const mapboxAccessToken = env.MAPBOX_ACCESS_TOKEN;

export const fetchCoordinatesData = async (
  nowCoords: {
    latitude: number;
    longitude: number;
  },
  shopCoords: {
    latitude: number;
    longitude: number;
  }
) => {
  const xp = new XMLParser();

  const reqURL = `https://api.mapbox.com/directions/v5/mapbox/walking/${nowCoords.longitude},${nowCoords.latitude};${shopCoords.longitude},${shopCoords.latitude}?geometries=geojson&access_token=${EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  try {
    const res = await fetch(reqURL);
    const data = await res.text();

    const routes: RoutesObject = JSON.parse(data);
    const coordinatesArray = routes.routes[0].geometry.coordinates;

    let coordinates: Coords[] = [];
    coordinatesArray.forEach((coordinate) => {
      coordinates.push({
        latitude: coordinate[1],
        longitude: coordinate[0],
      });
    });

    return coordinates;
  } catch (error) {
    return error;
  }
};
