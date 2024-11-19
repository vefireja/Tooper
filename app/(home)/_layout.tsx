import { View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import HeaderAvatar from '~/components/HeaderAvatar'
import { Text } from '~/components/ui/text'

export default function HomeLayout() {
  return (
    <Stack screenOptions={{
      headerTitleAlign:"center",
      headerRight:props => <HeaderAvatar/>,
      headerTitle:props =>  (
        <Text style={{
            fontFamily: "Manrope_700Bold"
        }}
            className='text-[#FED542] text-3xl'>
            Too
            <Text className='text-[#093DF4] text-3xl'>
                per
            </Text>
        </Text>)
    }}/>
  )
}