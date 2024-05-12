import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  containerStyle?: string;
  textStyle?: string;
  onPress: () => void;
};

const Button = (props: Props) => {
  const { containerStyle, textStyle, onPress } = props;
  return (
    <TouchableOpacity className="border-[1px] border-[#79747E]">
      <Text className="font-mpregular text-[#6750A4]">Button</Text>
    </TouchableOpacity>
  );
};

export default Button;
