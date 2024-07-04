import { Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  title: string;
  containerStyle?: string;
  textStyle?: string;
  onPress: () => void;
};

const Button = (props: Props) => {
  const { title, containerStyle, textStyle, onPress } = props;
  return (
    <TouchableOpacity
      className={`border-[1px] border-[#6750A4] ${containerStyle}`}
      onPress={onPress}
    >
      <Text
        className={`font-mpregular text-[#6750A4] text-center ${textStyle}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
