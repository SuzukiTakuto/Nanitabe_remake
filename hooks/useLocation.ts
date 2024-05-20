import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useRecoilState } from "recoil";
import { nowLocationState } from "@/recoil_utils/atoms";

export const useLocation = () => {
  const [location, setLocation] = useRecoilState(nowLocationState);
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription;

    const startLocationUpdates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Error", "Permission to access location was denied");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500, // 更新間隔（ミリ秒）
          distanceInterval: 2, // 更新するための移動距離（メートル）
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    };

    startLocationUpdates();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return location;
};
