import { View, Text } from "react-native";
import React from "react";
import Button from "./Button";
import { StationData } from "@/type";

type Props = {
  stations: StationData[];
  select: (index: number) => Promise<void>;
};

const DuplicateStationSelectionModal = (props: Props) => {
  const { stations, select } = props;

  return (
    <View className="w-[300px] bg-primary rounded-2xl">
      <Text className="text-xl text-center text-secondary font-mpregular my-5">
        どの駅？
      </Text>

      <View className="justify-center items-center mb-5">
        {stations.map((station, index) => (
          <Button
            key={index}
            title={`${station.name}(${station.prefecture})`}
            onPress={() => select(index)}
            containerStyle="w-[120px] py-1 my-1 rounded-2xl"
          />
        ))}
      </View>
    </View>
  );
};

export default DuplicateStationSelectionModal;
