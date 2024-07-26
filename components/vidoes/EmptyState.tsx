import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { router } from "expo-router";

import { images } from "@/constants";
import CustomButton from "../buttons/CustomButton";

interface IPropsEmptyState {
    title: string;
    subTitle: string;
}

const EmptyState = ({ title, subTitle }: IPropsEmptyState) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode="contain"
            />
            <Text className="text-sm font-pmedium text-gray-100">
                {subTitle}
            </Text>
            <Text className="text-xl font-psemibold text-white text-center">
                {title}
            </Text>
            <CustomButton
                title="Create Videos"
                handlePress={() => router.push("/create")}
                containerStyles="w-full mt-6"
            />
        </View>
    );
};

export default EmptyState;
