import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import React from "react";
import { HotpepperDataType } from "@/type";
import Button from "./Button";
import { Link, router } from "expo-router";

const Shop = (props: HotpepperDataType) => {
  const { name, photo, budget, urls } = props;
  const shopName = name.replace(/[\s ]+/g, "\n");

  const goHtpepper = () => {
    Linking.openURL(urls.pc).catch((err) => {
      console.error("URLを開けませんでした:", err);
    });
  };
  return (
    <View className="w-[360px] bg-primary rounded-2xl">
      <View className="flex-row justify-around items-center p-4">
        <View>
          <Image
            source={{ uri: photo.mobile.l }}
            className="w-[120px] h-[120px]"
            resizeMode="cover"
          />
          <Text className="text-[8px] pt-1">
            画像提供: ホットペッパーグルメ
          </Text>
        </View>

        <View>
          <Text className="text-xl text-center font-mpregular">{shopName}</Text>
          <Text className="text-center font-mpregular">
            料金: {budget.name}
          </Text>
        </View>
      </View>

      <View className="justify-center items-center">
        <TouchableOpacity
          className="w-[230px] py-2 rounded-2xl m-2 border-[1px] border-[#6750A4]"
          onPress={() => {
            goHtpepper();
          }}
        >
          <Text className="font-mpregular text-[#6750A4] text-center">
            ホットペッパーで見る
          </Text>
        </TouchableOpacity>
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
