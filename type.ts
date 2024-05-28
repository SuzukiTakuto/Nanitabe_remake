export type HotpepperDataType = {
  name: string;
  photo: {
    mobile: {
      l: string;
    };
  };
  budget: {
    average: string;
    name: string;
  };
  urls: {
    pc: string;
  };
  lat: number;
  lng: number;
};

export type Route = {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
};

export type Leg = {
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: any[];
  distance: number;
  summary: string;
};

export type Admin = {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
};

export type Geometry = {
  coordinates: [number, number][];
  type: string;
};

export type Waypoint = {
  distance: number;
  name: string;
  location: [number, number];
};

export type RoutesObject = {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
};

export type Coords = {
  latitude: number;
  longitude: number;
};

export type StationData = {
  line: string;
  name: string;
  next: string | null;
  postal: number;
  prefecture: string;
  prev: string | null;
  x: number;
  y: number;
};
