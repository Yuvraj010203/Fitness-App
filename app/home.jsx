import { View, Text, Image, BackHandler, Alert } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect } from "expo-router"; // ✅ correct one for expo-router
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageSlider from "../components/ImageSlider";
import BodyParts from "../components/BodyParts";


export default function Home() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Do you really want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white flex gap-y-5" edges={["top"]}>
      <StatusBar style="dark" />
      <View className="flex-row justify-between items-center mx-5">
        <View className="gap-y-2">
          <Text
            style={{ fontSize: hp(6) }}
            className="font-bold tracking-wider text-neutral-700"
          >
            Ready To
          </Text>
          <Text
            style={{ fontSize: hp(6) }}
            className="font-bold tracking-wider text-rose-500"
          >
            Workout
          </Text>
        </View>
        <View className="flex justify-center items-center gap-y-2">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: hp(8), width: hp(8), borderRadius: hp(4) }}
            resizeMode="cover"
          />
          <View className="bg-neutral-200 rounded-full flex justify-center items-center border-[3px] border-neutral-300">
            <Ionicons name="notifications" size={hp(5)} color="grey" />
          </View>
        </View>
      </View>

      <View>
        <ImageSlider />
      </View>

      <View className="flex-1">
        <BodyParts />
      </View>
    </SafeAreaView>
  );
}
