import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

const index = () => {
  const onPress = () => {};

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="mx-14 justify-center h-full">
        <View className="mb-2">
          <Text className="text-center font-mpregular text-xl mb-10">
            いくらくらいのお店?
          </Text>
          <InputField placeholder="1000" keyboardType="default" />
        </View>

        <View className="justify-center items-center">
          <Button
            title="決定"
            containerStyle="w-[80px] py-1 rounded-2xl"
            textStyle="text-center"
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
