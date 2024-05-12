import { View, Text, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useRecoilState } from "recoil";
import { priceSettingState } from "@/recoil_utils/atoms";
import { router } from "expo-router";

const index = () => {
  const [priceSetting, setPriceSetting] = useRecoilState(priceSettingState);

  const onPress = () => {
    if (priceSetting === 0) {
      Alert.alert("未入力", "1円以上の金額を入力してください");
      return;
    }
    router.push("/(location)");
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="mx-14 justify-center h-full">
        <View className="mb-2">
          <Text className="text-center font-mpregular text-2xl mb-10">
            いくらくらいのお店?
          </Text>
          <InputField
            placeholder="1000"
            keyboardType="numeric"
            handleChange={(e) => setPriceSetting(Number(e))}
          />
        </View>

        <View className="justify-center items-center">
          <Button
            title="決定"
            containerStyle="w-[80px] py-1 rounded-2xl"
            textStyle=""
            onPress={() => {
              onPress();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
