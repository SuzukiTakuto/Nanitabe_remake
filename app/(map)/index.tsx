import { View, Text, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Region, Polyline } from "react-native-maps";
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

const index = () => {
  const [hotpepperData, setHotpepperData] = useRecoilState(hotpepperDataState);
  const [nowLocation, setNowLocation] = useRecoilState(nowLocationState);
  const [startCoords, setStartCoords] = useRecoilState(startCoordsState);
  const [location, setLocation] = useRecoilState(locationState);
  const [shop, setShop] = useState<HotpepperDataType>();
  const [directionsCoords, setDirectionsCoords] = useState<Coords[]>([]);

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
          latitude: shop !== undefined ? shop.lat : 35.6,
          longitude: shop !== undefined ? shop.lng : 139.6917,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: nowLocation.coords.latitude,
            longitude: nowLocation.coords.longitude,
          }}
          image={images.gps}
        />
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
                {location === "now" && (
                  <Polyline
                    coordinates={[
                      nowLocation.coords,
                      {
                        latitude: directionsCoords[0].latitude,
                        longitude: directionsCoords[0].longitude,
                      },
                    ]}
                    strokeColor="#4620AA"
                    strokeWidth={6}
                  />
                )}
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
      {shop !== undefined && (
        <View className="absolute bottom-16 left-0 right-0 flex items-center">
          <Shop {...shop} />
        </View>
      )}

      <View className="absolute bottom-3 right-0 left-0 flex items-center">
        <Image source={images.hotpepperLog} />
      </View>
    </View>
  );
};

export default index;
