import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useRecoilState } from "recoil";
import {
  priceSettingState,
  locationState,
  stationNameState,
  hotpepperDataState,
  nowLocationState,
  startCoordsState,
} from "@/recoil_utils/atoms";
import { router } from "expo-router";
import {
  fetchStationSurroundingData,
  fetchSurroundingData,
} from "@/lib/hotpepper";
import { fetchStation } from "@/lib/express";
import { StationData } from "@/type";

const index = () => {
  const [priceSetting, setPriceSetting] = useRecoilState(priceSettingState);
  const [location, setLocation] = useRecoilState(locationState);
  const [stationName, setStationName] = useRecoilState(stationNameState);
  const [hotpepperData, setHotpepperData] = useRecoilState(hotpepperDataState);
  const [nowLocation, setNowLocation] = useRecoilState(nowLocationState);
  const [startCoords, setStartCoords] = useRecoilState(startCoordsState);
  const [candidateStations, setCandidateStations] = useState<StationData[]>([]); //複数の駅がある場合に各駅の情報を格納
  const [isDuplicateStations, setIsDuplicateStations] =
    useState<boolean>(false); //駅名が重複しているかどうか

  // 「別なところ」が押された時にステート変更
  const nowPlace = () => {
    setLocation("now");
  };

  // 「今いるところ」が押された時にステート変更
  const anotherPlace = () => {
    setLocation("another");
  };

  // 決定ボタンが押された時の処理
  const decision = async () => {
    if (location === "another" && stationName === "") {
      Alert.alert("未入力", "駅名を入力してください");
      return;
    }

    if (location === "another") {
      // 駅名が選択された場合
      const stationsData = await fetchStation(stationName);
      if (stationsData.length === 0) {
        Alert.alert("エラー", "駅名が見つかりませんでした");
        return;
      } else if (stationsData.length > 1) {
        setCandidateStations(stationsData);
        return;
      }

      await getStationSurroundingShops();
    } else if (location === "now") {
      const coords = {
        latitude: nowLocation.coords.latitude,
        longitude: nowLocation.coords.longitude,
      };
      setStartCoords(coords);
      const data = await fetchSurroundingData(priceSetting, coords);
      setHotpepperData(data);
    }
    router.push("/(map)");
  };

  // 同名の駅が複数ある場合の処理
  const decisionTargetStation = async (index: number) => {
    const targetStation = candidateStations[index];
    setStartCoords({
      latitude: targetStation.y,
      longitude: targetStation.x,
    });

    await getStationSurroundingShops();

    router.push("/(map)");
  };

  const getStationSurroundingShops = async () => {
    const shopsData = await fetchStationSurroundingData(
      priceSetting,
      stationName
    );
    setHotpepperData(shopsData);
  };

  return (
    <View className="relative w-full h-full">
      {candidateStations.length > 1 && (
        <View className="modal-overlay fixed w-full h-full bg-black/40 z-10"></View>
      )}
      <SafeAreaView className="absolute h-full w-full bg-primary">
        <View className="mx-14 justify-center h-full">
          <View className="mb-2">
            <Text className="text-center font-mpregular text-2xl mb-6">
              {priceSetting}円以内でどの辺で{"\n"}食べる?
            </Text>
          </View>

          <View className="w-full">
            <View className="justify-center items-center">
              <Button
                title="別なところ"
                containerStyle={`w-[140px] py-2 rounded-3xl mb-2 ${
                  location === "another" ? " bg-secondary" : ""
                }`}
                textStyle={`text-mpmedium text-lg ${
                  location === "another" ? "text-primary" : ""
                }`}
                onPress={() => {
                  anotherPlace();
                }}
              />
            </View>

            {location === "another" && (
              <View className="mb-5">
                <InputField
                  placeholder="例: 新宿"
                  keyboardType="default"
                  handleChange={(e) => setStationName(e)}
                />
              </View>
            )}

            <View className="justify-center items-center">
              <Button
                title="今いるところ"
                containerStyle={`w-[140px] py-2 rounded-3xl my-2 ${
                  location === "now" ? " bg-secondary" : ""
                }`}
                textStyle={`text-mpmedium text-lg ${
                  location === "now" ? "text-primary" : ""
                }`}
                onPress={() => {
                  nowPlace();
                }}
              />
            </View>
          </View>

          <View className="flex-row justify-between mt-9">
            <Button
              title="戻る"
              containerStyle="w-[80px] py-1 rounded-2xl"
              textStyle=""
              onPress={() => router.back()}
            />
            <Button
              title="決定"
              containerStyle="w-[80px] py-1 rounded-2xl"
              textStyle=""
              onPress={() => decision()}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;
