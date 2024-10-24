import { View, Text, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Region, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useRecoilState } from "recoil";
import {
  hotpepperDataState,
  locationState,
  nowLocationState,
  startCoordsState,
} from "@/recoil_utils/atoms";

import { Coords, HotpepperDataType } from "@/type";
import Shop from "@/components/Shop";
import { fetchCoordinatesData } from "@/lib/direction";
import images from "@/lib/images";
import NoShop from "@/components/NoShop";

const index = () => {
  const [hotpepperData, setHotpepperData] = useRecoilState(hotpepperDataState);
  const [nowLocation, setNowLocation] = useRecoilState(nowLocationState);
  const [startCoords, setStartCoords] = useRecoilState(startCoordsState);
  const [location, setLocation] = useRecoilState(locationState);
  const [shop, setShop] = useState<HotpepperDataType>();
  const [directionsCoords, setDirectionsCoords] = useState<Coords[]>([]);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState(true);

  useEffect(() => {
    const confirmationForegroundPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("位置情報がオンになっていないため、現在地が表示されません");
        setLocationPermissionStatus(false);
        return;
      }
    };
    confirmationForegroundPermission();
  }, []);

  useEffect(() => {
    if (hotpepperData) {
      const randomIndex = Math.floor(Math.random() * hotpepperData.length);
      setShop(hotpepperData[randomIndex]);
    }
  }, [hotpepperData]);

  useEffect(() => {
    const fetchDirection = async () => {
      if (!shop) return;
      try {
        const coords: Coords[] = await fetchCoordinatesData(startCoords, {
          longitude: shop?.lng,
          latitude: shop?.lat,
        });
        if (coords.length === 0) {
          throw new Error("経路情報の取得に失敗しました");
        }
        setDirectionsCoords(coords);
      } catch (error) {
        Alert.alert("エラー", "経路情報の取得に失敗しました");
      }
    };

    fetchDirection();
  }, [shop]);

  return (
    <View className="relative">
      <MapView
        className="w-full h-full"
        region={{
          latitude: shop !== undefined ? shop.lat : startCoords.latitude,
          longitude: shop !== undefined ? shop.lng : startCoords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {locationPermissionStatus && (
          <Marker
            coordinate={{
              latitude: nowLocation.coords.latitude,
              longitude: nowLocation.coords.longitude,
            }}
            image={images.gps}
          />
        )}
        {shop !== undefined && directionsCoords.length > 0 && (
          <View>
            <Marker
              coordinate={{
                latitude: shop.lat,
                longitude: shop.lng,
              }}
            />
            {directionsCoords.length > 0 && (
              <View>
                <Polyline
                  coordinates={directionsCoords}
                  strokeColor="#4620AA"
                  strokeWidth={6}
                />
                <Polyline
                  coordinates={[
                    directionsCoords[directionsCoords.length - 1],
                    { latitude: shop.lat, longitude: shop.lng },
                  ]}
                  strokeColor="#4620AA"
                  strokeWidth={6}
                />
              </View>
            )}
          </View>
        )}
      </MapView>
      {shop !== undefined ? (
        <View className="absolute bottom-16 left-0 right-0 flex items-center">
          <Shop {...shop} />
        </View>
      ) : (
        <View className="absolute bottom-16 left-0 right-0 flex items-center">
          <NoShop />
        </View>
      )}

      <View className="absolute bottom-3 right-0 left-0 flex items-center">
        <Image source={images.hotpepperLog} />
      </View>
    </View>
  );
};

export default index;
