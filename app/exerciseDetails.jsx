import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function exerciseDetails() {
    // const item = useLocalSearchParams();
    //     console.log('got item:', item);
    return ( 
        <View
        style={{
          flex: 1,
          backgroundColor: 'white', // or any color you want
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          marginTop: 'auto', // pushes it to bottom like a modal
        }}
      >
        <Text>
            Hi this is great
        </Text>
      </View>
      
  )
}