import { View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { supabase } from '~/lib/supabase'
import { Text } from '~/components/ui/text'
import { ThemeToggle } from '~/components/ThemeToggle'
import { useAuth } from '~/provider/AuthProviders'

export default function Profile() {
    const { profile } = useAuth()
    const GITHUB_AVATAR_URI =
        'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';
    return (
        <>
            <Stack.Screen options={{
                presentation: 'modal',
                animation: 'fade',
                headerShown: false,
            }} />
            <View className=' flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
                <View className='flex items-center gap-5'>
                    <Avatar alt="Rick Sanchez's Avatar" className='w-32 h-32'>
                        <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
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
            {/* <View className=' flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
                <Card className='w-full max-w-sm p-6 rounded-2xl'>
                    <CardHeader className='items-center'>
                        <Avatar alt="Rick Sanchez's Avatar" className='w-24 h-24'>
                            <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                            <AvatarFallback>
                                <Text>RS</Text>
                            </AvatarFallback>
                        </Avatar>
                        <View className='p-3' />
                        <CardTitle className=' pb-2 text-center'>Rick Sanchez</CardTitle>
                        <View className='flex-row items-center'>
                            <CardDescription className='text-base font-semibold'>Scientist</CardDescription>
                        </View>
                    </CardHeader>
                    <CardContent>
                        <View className='flex-row justify-around gap-3'>
                            <View className='items-center'>
                                <Text className='text-sm text-muted-foreground'>Dimension</Text>
                                <Text className='text-xl font-semibold'>C-137</Text>
                            </View>
                            <View className='items-center'>
                                <Text className='text-sm text-muted-foreground'>Age</Text>
                                <Text className='text-xl font-semibold'>70</Text>
                            </View>
                            <View className='items-center'>
                                <Text className='text-sm text-muted-foreground'>Species</Text>
                                <Text className='text-xl font-semibold'>Human</Text>
                            </View>
                        </View>
                    </CardContent>
                    <CardFooter className='flex-row gap-3 pb-0'>
                        <ThemeToggle/>
                        <Button
                            variant='outline'
                            className='shadow shadow-foreground/5'
                            onPress={async () => {
                                await supabase.auth.signOut()
                            }}
                        >
                            <Text>Sign Out</Text>
                        </Button>
                    </CardFooter>
                </Card>
            </View> */}
        </>
    )
}