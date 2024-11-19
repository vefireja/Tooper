import { View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '~/lib/supabase'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function ToolScreen() {
    const { id } = useLocalSearchParams()
    const [email, setEmail] = useState('')
    const [selectedTool, setSelectedTool] = useState([])
    useEffect(() => {
        async function fetchSelectedTool() {
            const { data, error }: { data: any, error: any } = await supabase.from("tools").select('*').eq('tool_id', id)
            if (error) {
                console.log(error);
                return
            }
            setSelectedTool(data || [])
        }
        fetchSelectedTool()
    }, [id])


    return (
        <View className='flex-1 p-6 justify-center items-center'>
            {selectedTool.map((tool: any) => (
                <View key={tool.tool_id} className='flex w-full items-center gap-10'>
                    <Text className='text-center text-5xl' style={{
                        fontFamily: "Manrope_700Bold"
                    }}>{tool.title}</Text>
                    <Image source={{ uri: tool.imageuri }} className='rounded-lg mb-5 w-52 h-52' />
                    <View className=' max-w-xs'>
                        <Text className='text-center mb-4 text-xl' style={{
                            fontFamily: "Manrope_500Medium"
                        }} >{tool.description}</Text>
                    </View>
                    <View className='w-full flex flex-row items-center justify-between'>

                        <View>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link" size={'sm'}>
                                        <Text className='text-xl' style={{
                                            fontFamily: "Manrope_700Bold"
                                        }}>
                                            Panduan Pengunaan
                                        </Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='max-w-[350px]'>
                                    <DialogHeader>
                                        <DialogTitle>Panduan Penggunaan</DialogTitle>
                                        <DialogDescription asChild>
                                            {/* <ScrollView className='h-[400px]'>
                                                {tool.usageguide.map((guide: any, index: any) => (
                                                    <Text key={index} style={{ fontFamily: "Manrope_500Medium" }} className='mb-2 text-xl'>
                                                        {index + 1}.{' '}{guide}
                                                    </Text>
                                                ))}
                                            </ScrollView> */}
                                            <FlatList data={tool.usageguide} renderItem={({ item, index }) => (
                                                <Text key={index} style={{ fontFamily: "Manrope_500Medium" }} className='mb-2 text-xl'>
                                                    {index + 1}.{' '}{item}
                                                </Text>
                                            )} />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </View>
                        <View>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="default" >
                                        <Text className='text-xl' style={{
                                            fontFamily: "Manrope_400Regular"
                                        }}>
                                            Unduh
                                        </Text>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className='max-w-[350px]'>
                                    <DialogHeader>
                                        <DialogTitle style={{fontFamily:"Manrope_700Bold"}}>Konfirmasi Unduhan</DialogTitle>
                                        <DialogDescription >
                                            <View>
                                                <Text className='text-sm' style={{
                                                    fontFamily:"Manrope_300Light"
                                                }}>Silakan masukkan email anda, tools akan segera dikirimkan melalui email yang anda masukkan</Text>
                                            </View>
                                            <View className='flex w-full gap-3'>
                                                <Label nativeID='inputEmail' >
                                                    <Text className='text-lg' style={{
                                                        fontFamily: "Manrope_600SemiBold"
                                                    }}>Email</Text>
                                                </Label>
                                                <Input
                                                    placeholder='example@mail.com'
                                                    value={email}
                                                    className='w-full'
                                                    style={{
                                                        fontFamily: "Manrope_400Regular"
                                                    }}
                                                    onChangeText={setEmail}
                                                    aria-labelledby='inputEmail'
                                                    aria-errormessage='emailError'
                                                    keyboardType='email-address'
                                                    autoComplete='off'
                                                />
                                            </View>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button>
                                                <Text style={{fontFamily:"Manrope_400Regular"}}>OK</Text>
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}