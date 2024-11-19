import React from 'react'
import { Link, Redirect, Stack } from 'expo-router'
import HeaderAvatar from '~/components/HeaderAvatar'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/provider/AuthProviders'

export default function HomeLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Redirect href={'/(auth)/signin'} />
  }
  return (
    <Stack screenOptions={{
      headerTitleAlign: "center",
      headerRight: props =>
        <Link href='/profile'>
          <HeaderAvatar />
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