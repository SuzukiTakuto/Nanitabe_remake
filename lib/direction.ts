import { Coords, RoutesObject } from "@/type";

export const fetchCoordinatesData = async (
  nowCoords: {
    latitude: number;
    longitude: number;
  },
  shopCoords: {
    latitude: number;
    longitude: number;
  }
): Promise<Coords[]> => {
  const reqURL = `https://api.mapbox.com/directions/v5/mapbox/walking/${nowCoords.longitude},${nowCoords.latitude};${shopCoords.longitude},${shopCoords.latitude}?geometries=geojson&walkway_bias=1&access_token=${process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

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
    console.log(error);
    return [];
  }
};
