import { View, Text, TextInput } from "react-native";
import React from "react";

type Props = {
  placeholder: string;
  keyboardType: "default" | "numeric" | "email-address" | "phone-pad";
  handleChange: (text: string) => void;
};

const InputField = (props: Props) => {
  const { placeholder, keyboardType } = props;
  return (
    <View className="space-y-2">
      <View className="w-full border-[1px] border-secondary p-4 rounded-md">
        <TextInput
          className="text-2xl font-mpregular text-secondary"
          placeholder={placeholder}
          placeholderTextColor={"#6750A4"}
          keyboardType={keyboardType}
          onChangeText={(priceText) => props.handleChange(priceText)}
        />
      </View>
    </View>
  );
};

export default InputField;
