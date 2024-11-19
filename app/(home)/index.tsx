import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import HeaderAvatar from '~/components/HeaderAvatar'

export default function Home() {
    return (
        <>
            <Stack.Screen options={{
                animation: "fade",
                headerRight: props => (
                   <HeaderAvatar/>
                ),
                headerTitleAlign:"center",
                headerTitle: props => (
                    <Text style={{
                        fontFamily: "Manrope_700Bold"
                    }}
                        className='text-[#FED542] text-3xl'>
                        Too
                        <Text className='text-[#093DF4] text-3xl'>
                            per
                        </Text>
                    </Text>)
            }} />
            <View>
                <Text>Home</Text>
            </View>
        </>
    )
}