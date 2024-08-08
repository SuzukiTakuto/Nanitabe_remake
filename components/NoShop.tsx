import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React from "react";
import Button from "./Button";
import { Link, router } from "expo-router";

const Shop = () => {
  return (
    <View className="w-[360px] bg-primary rounded-2xl">
      <View className="justify-center items-center p-4">
        <Text className="text-xl text-center font-mpregular">
          お店が見つかりませんでした
        </Text>
        <Text className="text-sm text-center font-mpregular">
          設定価格を少し上げたら見つかるかも
        </Text>
        <TouchableOpacity
          className="w-[230px] py-2 rounded-2xl m-2 border-[1px] border-[#6750A4]"
          onPress={() => {
            router.dismissAll();
          }}
        >
          <Text className="font-mpregular text-[#6750A4] text-center">
            最初に戻る
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shop;
