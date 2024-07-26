import "react-native-url-polyfill/auto";
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/buttons/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";

import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";

const App = () => {
    const { isLoading, isLoggedin } = useGlobalContext();

    if (!isLoading && isLoggedin) return <Redirect href="/home"/>;

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full min-h-[85vh] justify-center items-center px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] -full h-[300px]"
                        resizeMode="contain"
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless Possibilities With{" "}
                            <Text className="text-secondary-200">Liêm</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[136px] h-[15px] absolute -right-2 -bottom-2"
                        />
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey
                        of Limitless Exploration with Aora
                    </Text>
                    <CustomButton
                        title={"Continue With Email"}
                        containerStyles="w-full mt-7"
                        handlePress={() => router.push("/sign-in")}
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default App;
