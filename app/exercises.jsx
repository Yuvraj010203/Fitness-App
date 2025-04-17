import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react';
import { fetchExercisesByBodypart } from '../api/exerciseDB';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-virtualized-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExerciseList from '../components/ExerciseList';

export default function Exercises() {
  const router = useRouter();
  const item = useLocalSearchParams();
  // console.log('got item:', item);
  const [exercises, setExercises] = useState([]);
  useEffect(()=>{
    if(item?.name) getExercises(item.name.toLowerCase());
  },[item.name])

  const getExercises = async (bodyPart)=>{
    let data = await fetchExercisesByBodypart(bodyPart);
    setExercises(data);
    // console.log("gotData:", data);
  }

  return (
    <ScrollView >
      <StatusBar style="dark"/>
      <Image 
        source={item.image}
        style={{width: wp(100), height: hp(45)}}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        onPress={()=>router.back()}
        className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full"
        style={{height: hp(5.5), width: hp(5.5), marginTop: hp(7)}}
      >
        <Ionicons name="caret-back-outline" size={hp(4.5)} color="white" />
      </TouchableOpacity>

      {/* Exercises */}
      <View className="mx-4 space-y-3 mt-4">
        <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-700">
          {item.name} Exercises
        </Text>
        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  )
}