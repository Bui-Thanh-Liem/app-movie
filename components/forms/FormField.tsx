import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface IPropsFormField {
    title: string;
    value: string;
    placeholder: string;
    otherStyles?: string;
    keyboardType?: string;
    handleChangeText: (val: string) => void;
}

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    keyboardType,
    otherStyles,
    ...props
}: IPropsFormField) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-white">{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
                <TextInput
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#7b7b8b"}
                    className="flex-1 text-white font-semibold text-base"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            className="w-6 h-6"
                            resizeMode="contain"
                            source={!showPassword ? icons.eye : icons.eyeHide}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
