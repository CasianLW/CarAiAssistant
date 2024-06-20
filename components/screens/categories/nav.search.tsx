import Fav2Icon from "@/assets/images/icons/fav2.icon";
import GoBackIcon from "@/assets/images/icons/goback.icon";
import React, { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface NavSearchProps {
  goBack?: () => void;
}
const NavSearch: FC<NavSearchProps> = ({ goBack }) => {
  return (
    <View className="w-full h-24 pt-12 bg-app-blue-100">
      {goBack && (
        <TouchableOpacity
          className="w-10 h-10 absolute top-14 left-6"
          onPress={goBack}
        >
          <GoBackIcon fill={"#fff"} />
        </TouchableOpacity>
      )}

      <Text
        className="text-app-white-100 text-xl m-auto"
        style={{ fontFamily: "UrbanistSemiBold600" }}
      >
        CarApp
      </Text>
    </View>
  );
};

export default NavSearch;
