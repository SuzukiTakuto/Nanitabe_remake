import { StationData } from "../type";

export const fetchStation = async (stationName: string) => {
  const reqURL = `https://express.heartrails.com/api/json?method=getStations&name=${stationName}`;

  const res = await fetch(reqURL);
  const data = await res.text();

  const stations: StationData[] = JSON.parse(data).response.station;

  if (!stations) {
    return [];
  }

  const uniqueStations = stations.filter(
    (station, index, self) =>
      index === self.findIndex((s) => s.prefecture === station.prefecture)
  );

  return uniqueStations;
};
