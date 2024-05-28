import { StationData } from "../type";

export const fetchStation = async (stationName: string) => {
  const reqURL = `https://express.heartrails.com/api/json?method=getStations&name=${stationName}`;

  const res = await fetch(reqURL);
  const data = await res.text();

  const stations: StationData[] = JSON.parse(data).response.station;

  return stations;
};
