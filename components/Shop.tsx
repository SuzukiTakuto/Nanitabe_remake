import { View, Text, Image, Linking } from "react-native";
import React from "react";
import { HotpepperDataType } from "@/type";
import Button from "./Button";
import { router } from "expo-router";

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
        <Button
          title="ホットペッパーで見る"
          containerStyle="w-[230px] py-2 rounded-2xl m-2"
          onPress={() => {
            goHtpepper();
          }}
        />
        <Button
          title="最初に戻る"
          containerStyle="w-[230px] py-2 rounded-2xl m-2"
          onPress={() => {
            router.push("/");
          }}
        />
      </View>
    </View>
  );
};

export default Shop;
