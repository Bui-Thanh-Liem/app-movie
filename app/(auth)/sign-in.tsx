import { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";

import FormField from "@/components/forms/FormField";
import CustomButton from "@/components/buttons/CustomButton";
import { images } from "@/constants";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!form.email.trim() || !form.password.trim()) {
            Alert.alert("Error", "Please fill in all fields !");
            return;
        }
        setIsSubmiting(true);

        try {
            const result = await signIn(form.email, form.password);

            if (!result.$id) {
                Alert.alert("Error", "Create user failed");
            }
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", "");
        } finally {
            setIsSubmiting(false);
        }
    };

    return (
        <>
            <SafeAreaView className="bg-primary h-full">
                <ScrollView>
                    <View className="w-full justify-center min-h-[100vh] px-4 my-6">
                        <View className="items-center">
                            <Image
                                source={images.logo}
                                className="w-[115px] h-[35px]"
                                resizeMode="contain"
                            />
                            <Text className="text-2x text-white font-semibold mt-5">
                                Login in to Liêm
                            </Text>
                        </View>

                        <FormField
                            title={"Email"}
                            placeholder="Enter your email address"
                            value={form.email}
                            handleChangeText={(val) =>
                                setForm({ ...form, email: val })
                            }
                            otherStyles="mt-7"
                            keyboardType="email-address"
                        />
                        <FormField
                            placeholder="Enter password"
                            title={"Password"}
                            value={form.password}
                            handleChangeText={(val) =>
                                setForm({ ...form, password: val })
                            }
                            otherStyles="mt-7"
                        />

                        <CustomButton
                            title="Sign in"
                            handlePress={onSubmit}
                            containerStyles="mt-7"
                            isLoading={isSubmiting}
                        />
                        <View className="mt-5 justify-center flex-row">
                            <Text className="text-gray-100 text-[16px] font-pregular">
                                Don't have account ?
                            </Text>
                            <Link
                                className="text-[16px] font-psemibold text-secondary"
                                href={"/sign-up"}
                            >
                                Sign up
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <StatusBar backgroundColor="" />
        </>
    );
};

export default SignIn;
