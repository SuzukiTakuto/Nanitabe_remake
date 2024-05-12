import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import InputField from "@/components/InputField";

const index = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <Text className="">いくらくらいのお店?</Text>
      <InputField placeholder="駅名" keyboardType="default" />
    </SafeAreaView>
  );
};

export default index;
