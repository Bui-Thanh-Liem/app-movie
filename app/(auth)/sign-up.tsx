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
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const onSubmit = async () => {
        if (
            !form.username.trim() ||
            !form.email.trim() ||
            !form.password.trim()
        ) {
            Alert.alert("Error", "Please fill in all fields !");
            return;
        }
        setIsSubmiting(true);

        try {
            const result = await createUser(
                form.email,
                form.username,
                form.password
            );

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
                                Sign up to Liêm
                            </Text>
                        </View>

                        <FormField
                            title={"Username"}
                            placeholder="Enter your username"
                            value={form.username}
                            handleChangeText={(val) =>
                                setForm({ ...form, username: val })
                            }
                            otherStyles="mt-7"
                            keyboardType="email-address"
                        />
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
                            title="Sign up"
                            handlePress={onSubmit}
                            containerStyles="mt-7"
                            isLoading={isSubmiting}
                        />
                        <View className="mt-5 justify-center flex-row">
                            <Text className="text-gray-100 text-[16px] font-pregular">
                                Have an account already?
                            </Text>
                            <Link
                                className="text-[16px] font-psemibold text-secondary"
                                href={"/sign-in"}
                            >
                                Sign in
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <StatusBar backgroundColor="" />
        </>
    );
};

export default SignUp;
