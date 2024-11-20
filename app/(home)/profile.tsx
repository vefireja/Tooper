import { View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { supabase } from '~/lib/supabase'
import { Text } from '~/components/ui/text'
import { ThemeToggle } from '~/components/ThemeToggle'
import { useAuth } from '~/provider/AuthProviders'

export default function Profile() {
    const { profile } = useAuth()

    return (
        <>
            <Stack.Screen options={{
                presentation: 'modal',
                animation:"slide_from_bottom",
                headerTransparent:true,
                headerTitle:"",
                headerRight:undefined
            }} />
            <View className=' flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
                <View className='flex items-center gap-5'>
                    <Avatar alt="Rick Sanchez's Avatar" className='w-32 h-32'>
                        <AvatarImage source={require('~/assets/images/icon.png')} />
                        <AvatarFallback>
                            <Text>RS</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View className='items-center'>
                        <Text className='text-3xl text-center' style={{ fontFamily: 'Manrope_700Bold' }}>{profile.full_name}</Text>
                        <Text className='text-base' style={{ fontFamily: 'Manrope_600SemiBold' }}>{profile.programs.program_name}</Text>
                    </View>
                </View>
                <View className='flex-row gap-4 justify-center items-center'>
                    <View>
                        <ThemeToggle />
                    </View>
                    <Button
                        variant='outline'
                        className='shadow shadow-foreground/5'
                        onPress={async () => {
                            await supabase.auth.signOut()
                        }}
                    >
                        <Text>Sign Out</Text>
                    </Button>
                </View>
            </View>
        </>
    )
}