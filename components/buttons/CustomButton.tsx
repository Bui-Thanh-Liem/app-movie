import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface IPropsCustomButton {
    title: string;
    handlePress: (e: any) => void;
    containerStyles? : string;
    textStyles?: string;
    isLoading?: boolean;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: IPropsCustomButton) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[58px] justify-center items-center ${containerStyles}`}
            disabled={isLoading}
        >
            <Text
                className={`text-primary font-psemibold text-lg ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
