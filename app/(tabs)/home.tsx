import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    Image,
    RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import SearchInput from "@/components/forms/SearchInput";
import Trending from "@/components/vidoes/Trending";
import EmptyState from "@/components/vidoes/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/cards/VideoCard";

const Home = () => {
    // const [valSearch, setValSearch] = useState<string>("");
    const [refreshing, setRefreshing] = useState(false);
    const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
    const {
        data: latestPosts,
        isLoading: isLoadingLatestPosts,
        refetch: refetchLatestPosts,
    } = useAppwrite(getLatestPosts);

    //
    const onRefresh = () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => (item as any).$id.toString()}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => {
                    return (
                        <View className="mt-16 px-4 space-y-4">
                            <View className="justify-between items-start flex-row mb-8">
                                <View>
                                    <Text className="text-sm font-pmedium text-gray-100">
                                        Welcome Back
                                    </Text>
                                    <Text className="text-2xl font-psemibold text-white">
                                        User name
                                    </Text>
                                </View>
                                <View>
                                    <Image
                                        source={images.logoSmall}
                                        className="w-9 h-10"
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                            <View>
                                <SearchInput
                                    value={""}
                                    handleChangeText={() => {}}
                                    placeholder="Search for a video topic"
                                />
                            </View>
                            <View>
                                <Text className="text-gray-100 mt-8 font-pregular mb-2">
                                    Latest Videos
                                </Text>
                                <Trending posts={latestPosts} />
                            </View>
                        </View>
                    );
                }}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="Not Videos Found"
                        subTitle="Be the first one to upload a video"
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Home;
