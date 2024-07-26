import {
    Text,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { ResizeMode, Video } from "expo-av";

import { generatorKey } from "@/utils/generatorKey.utls";
import * as Animatable from "react-native-animatable";
import icons from "@/constants/icons";

//
const zoomIn: any = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1,
    },
};
const zoomOut: any = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
};

//
const TrendingItem = ({ item, activeItem }: any) => {
    const [play, setPlay] = useState(false);

    console.log("compare:::", item.$id === activeItem.$id);

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
            duration={500}
            // animation={zoomIn}
        >
            {play ? (
                <Video
                    source={{ uri: item.video }}
                    className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="absolute w-12 h-12"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: any) => {
    const [activeItem, setActiveItem] = useState(posts[1]);

    //
    const viewableItemChange = useCallback(({ viewableItems }: any) => {
        console.log("cahnge view");

        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    }, []);

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => generatorKey(item.$id as string)}
            renderItem={({ item }) => (
                <TrendingItem item={item} activeItem={activeItem} />
            )}
            horizontal
            onViewableItemsChanged={viewableItemChange}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 60,
            }}
            contentOffset={{ x: 170 } as any}
            className="mb-8"
        />
    );
};

export default Trending;
