import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"; 

export default function ExerciseList({data}) {
  const router = useRouter();
  return (
    <View>
      <FlatList
        data={data}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item, index }) => (
          <ExerciseCard router={router} index={index} item={item} />
        )}
      />
    </View>
    
  )
}

const ExerciseCard =({router, index, item})=> {
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  return(
    <Animated.View entering={FadeInDown.duration(400).delay(index*200).springify()}>
      <TouchableOpacity
        className="flex py-3 gap-y-2"
        onPress={()=>router.push({pathname:'/exerciseDetails', params: item})}
      >
        <View className="bg-neutral-200 shadow-red-700 rounded-[25px]">
          <Image 
            source={{uri: item.gifUrl}}
            contentFit='cover'
            style={{width: wp(44), height: wp(52)}}
            className='rounded-[25px]'
          />
        </View>
        <Text
          style={{fontSize:hp(1.7)}}
          className='text-neutral-700 font-semibold ml-1 tracking-wide'
        >
          {
            item?.name?.length>20 ? capitalizeWords(item.name.slice(0,20))+'...' : capitalizeWords(item.name)
          }
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}