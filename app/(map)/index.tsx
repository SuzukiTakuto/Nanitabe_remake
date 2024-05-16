import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import { hotpepperDataState, nowLocationState } from "@/recoil_utils/atoms";
import { HotpepperDataType } from "@/type";
import Shop from "@/components/Shop";

const index = () => {
  const [hotpepperData, setHotpepperData] = useRecoilState(hotpepperDataState);
  const [nowLocation, setNowLocation] = useRecoilState(nowLocationState);
  const [shop, setShop] = useState<HotpepperDataType>();

  useEffect(() => {
    if (hotpepperData) {
      const randomIndex = Math.floor(Math.random() * hotpepperData.length);
      setShop(hotpepperData[randomIndex]);
    }
  }, [hotpepperData]);

  return (
    <View className="relative">
      <MapView
        className="w-full h-full"
        region={{
          latitude: shop !== undefined ? shop.lat : 35.6895,
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
        />
        {shop !== undefined && (
          <Marker
            coordinate={{
              latitude: shop.lat,
              longitude: shop.lng,
            }}
          />
        )}
      </MapView>
      {shop !== undefined && (
        <View className="absolute bottom-14 left-0 right-0 flex items-center">
          <Shop {...shop} />
        </View>
      )}
    </View>
  );
};

export default index;
