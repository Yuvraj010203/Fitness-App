import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function BodyParts() {
  const router = useRouter();
  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-700"
      >
        Exercises
      </Text>

      <FlatList
        data={bodyParts}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item, index }) => (
          <BodyPartCard router={router} index={index} item={item} />
        )}
      />
    </View>
  );
}

const BodyPartCard = ({ item, router, index }) => {
  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify()}>
      <TouchableOpacity
        style={{
          width: wp(44),
          height: wp(52),
          borderRadius: 35,
          overflow: 'hidden', // 💡 Add this to clip corners
        }}
        className="flex justify-end p-4 mb-4"
        onPress={()=>router.push({pathname:'/exercises', params: item})}
      >
        <Image
          source={item?.image}
          resizeMode="cover"
          style={{
            width: wp(44),
            height: wp(52),
            position: 'absolute',
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            width: wp(44),
            height: wp(15),
            position: 'absolute',
            bottom: 0,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35, // 💡 Explicitly round bottom
          }}
        />
        <Text
          style={{ fontSize: hp(2.3) }}
          className="text-white font-semibold tracking-wide z-10"
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

