import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface IPropsSearchInput {
    value: string;
    placeholder?: string;
    otherStyles?: string;
    keyboardType?: string;
    handleChangeText: (val: string) => void;
}

const SearchInput = ({
    value,
    placeholder,
    handleChangeText,
    keyboardType,
    otherStyles,
    ...props
}: IPropsSearchInput) => {
    return (
        <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
            <TextInput
                value={value}
                placeholder={placeholder}
                placeholderTextColor={"#7b7b8b"}
                className="text-base mt-0.5 text-white font-pregular flex-1"
                onChangeText={handleChangeText}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
