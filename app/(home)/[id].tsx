import { View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '~/lib/supabase'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'

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
                                <DialogContent className='max-w-[300px] '>
                                    <DialogHeader>
                                        <DialogTitle>Panduan Penggunaan</DialogTitle>
                                        <DialogDescription>
                                            {/* <ScrollView className='h-[400px]'>
                                                {tool.usageguide.map((guide: any, index: any) => (
                                                    <Text key={index} style={{ fontFamily: "Manrope_500Medium" }} className='mb-2 text-xl'>
                                                        {index + 1}.{' '}{guide}
                                                    </Text>
                                                ))}
                                            </ScrollView> */}
                                            <FlatList data={tool.usageguide} className='h-[450px]'  renderItem={({ item, index }) => (
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
                                        <DialogTitle style={{ fontFamily: "Manrope_700Bold" }}>Konfirmasi Unduhan</DialogTitle>
                                        <DialogDescription >
                                            <View className='w-full flex-1 h-28'>
                                                <Text className='text-xl' style={{
                                                    fontFamily: "Manrope_300Light"
                                                }}>Anda akan dialihkan ke link berikut: {' '}
                                                    <Text className='text-xl underline' style={{
                                                        fontFamily: "Manrope_400Regular"
                                                    }}>{tool.link_unduh}</Text>
                                                </Text>
                                            </View>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button onPress={() => router.push(tool.link_unduh)} >
                                            <Text style={{ fontFamily: "Manrope_400Regular" }}>OK</Text>
                                        </Button>
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