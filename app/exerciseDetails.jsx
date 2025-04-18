import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

export default function exerciseDetails() {
  const router = useRouter();
  const item = useLocalSearchParams();

  const capitalizeWords = (str) => {
    return str?.replace(/\b\w/g, char => char.toUpperCase());
  };

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <View className="flex-1 bg-white">
      {/* Header Image Section */}
      <View className="shadow-md bg-neutral-200 rounded-b-[40px] relative">
        <Image
          source={{ uri: item.gifUrl }}
          contentFit="cover"
          style={{
            width: wp(100),
            height: wp(100),
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4
          }}
        />

        <TouchableOpacity
          onPress={() => router.back()}
          style={{ height: hp(7), width: hp(7), marginTop: hp(7), position: 'absolute' }}
          className="mx-4"
        >
          <Ionicons name="arrow-undo-circle-outline" size={hp(6.5)} color="#f43f5e" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text
         entering={FadeInDown.duration(300).springify()}
         style={{ fontSize: hp(4) }} className="font-semibold text-neutral-800 tracking-wide">
          {capitalizeWords(item.name)}
        </Animated.Text>

        <Animated.Text
         entering={FadeInDown.delay(100).duration(300).springify()} style={{ fontSize: hp(2.5) }} className="text-neutral-700 tracking-wide">
          Equipment <Text className="font-bold text-neutral-800">{capitalizeWords(item?.equipment)}</Text>
        </Animated.Text>

        <Animated.Text
         entering={FadeInDown.delay(200).duration(300).springify()} style={{ fontSize: hp(2.5) }} className="text-neutral-700 tracking-wide">
          Secondary Muscles <Text className="font-bold text-neutral-800">{capitalizeWords(item?.secondaryMuscles)}</Text>
        </Animated.Text>

        <Animated.Text
         entering={FadeInDown.delay(300).duration(300).springify()} style={{ fontSize: hp(2.5) }} className="text-neutral-700 tracking-wide">
          Target Muscle <Text className="font-bold text-neutral-800">{capitalizeWords(item?.target)}</Text>
        </Animated.Text>

        <Animated.Text
         entering={FadeInDown.delay(400).duration(300).springify()} style={{ fontSize: hp(3), marginTop: 12 }} className="font-semibold text-neutral-800 tracking-wide">
          Instructions
        </Animated.Text>

        {item.instructions.split(',').map((instruction, index) => (
          <Animated.Text
            entering={FadeInDown.delay((index+6)*100).duration(300).springify()}
            key={instruction + index}
            style={{ fontSize: hp(2), marginTop: 6 }}
            className="text-neutral-800"
          >
            {index + 1}. {capitalizeFirst(instruction).trim()}
          </Animated.Text>
        ))}
      </ScrollView>
    </View>
  );
}
