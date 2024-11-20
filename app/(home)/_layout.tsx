import React from 'react'
import { Link, Redirect, Stack } from 'expo-router'
import HeaderAvatar from '~/components/HeaderAvatar'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/provider/AuthProviders'
import { Settings2 } from '~/lib/icons/Setting'

export default function HomeLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Redirect href={'/(auth)/signin'} />
  }
  return (
    <Stack screenOptions={{
      headerBackButtonDisplayMode: "minimal",
      headerTitleAlign: "center",
      headerRight: props =>
        <Link href='/profile'>
          <Settings2  className='w-20 h-20 text-foreground'/>
        </Link>
      ,
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
  )
}