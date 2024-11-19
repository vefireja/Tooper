import * as React from 'react';
import { Image, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Redirect, router } from 'expo-router';
import { useAuth } from '~/provider/AuthProviders';

export default function Screen() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href='/(home)' />
  }
  return (
    <View className='flex-1 p-6 bg-secondary/30'>
      <View className='flex-1 justify-center items-center'>
        <Image source={require('~/assets/images/icon.png')} className='w-56 h-56' />
        <Text className='text-center text-xl mt-5' style={{ fontFamily: "Manrope_700Bold" }}>
          Persiapkan tools perkuliahan anda bersama{' '}
          <Text className='text-[#FED542] text-xl' style={{ fontFamily: "Manrope_700Bold" }}>
            Too
            <Text className='text-[#093DF4] text-xl' style={{ fontFamily: "Manrope_700Bold" }}>per</Text>
          </Text>
        </Text>
      </View>
      <View className='mt-auto'>
        <Button className='w-full' onPress={()=>{
          router.push('/signin')
        }}>
          <Text className='text-xl' style={{
            fontFamily: "Manrope_400Regular"
          }}>
            Mulai sekarang
          </Text>
        </Button>
      </View>
    </View>


  );
}
