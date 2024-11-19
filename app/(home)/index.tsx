import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputSelect from '~/components/InputSelect'
import { Label } from '~/components/ui/label'
import { Text } from '~/components/ui/text'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { supabase } from '~/lib/supabase'
import { Card, CardContent } from '~/components/ui/card'
import {  router, Stack } from 'expo-router'
import { Input } from '~/components/ui/input'
import { Search } from '~/lib/icons/Search'
import { Button } from '~/components/ui/button'

export default function Home() {
    const [jurusan, setJurusan] = useState('')
    const [search, setSearch] = useState('')
    const [matakuliah, setMataKuliah] = useState([])
    const [selectedMatakuliah, setSelectedMataKuliah] = useState('')
    const [tool, setTool] = useState()
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12,
    };

    useEffect(() => {
        setMataKuliah([])
        setSelectedMataKuliah('')
        async function fetchMataKuliah() {
            const { data, error }: { data: any, error: any } = await supabase.from("subjects").select('*').eq('program_id', jurusan)
            if (error) {
                console.log(error);
                return
            }
            setMataKuliah(data || [])
        }

        fetchMataKuliah()

    }, [jurusan])

    useEffect(() => {

        async function fetchTools() {
            const query = supabase
                .from("tools")
                .select('*')

            // if (selectedMatakuliah) {
            //     query.eq('subject_id', selectedMatakuliah)
            // }

            const { data, error }: { data: any, error: any } = await query

            if (error) {
                console.log(error);
                return
            }
            const filtered = data.filter((tool: any) => {
                const matchesSearch = tool.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                const matchesSubject = selectedMatakuliah !== ''
                    ? tool.subject_id === selectedMatakuliah
                    : true; // If no subject is selected, include all
                return matchesSearch && matchesSubject;
            });

            setTool(filtered || [])
        }
        fetchTools()
    }, [search, selectedMatakuliah])


    return (
        <>
            <Stack.Screen options={{ headerBackVisible: false }} />
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className='flex-1 gap-5 p-6'>
                    <View className='flex gap-2'>
                        <Label>
                            <Text className='text-xl' style={{ fontFamily: "Manrope_600SemiBold" }}>
                                Jurusan
                            </Text>
                        </Label>
                        <InputSelect handleOnValueChange={setJurusan} />
                    </View>
                    <View className='flex gap-2'>
                        <Label>
                            <Text className='text-xl' style={{ fontFamily: "Manrope_600SemiBold" }}>
                                Matakuliah
                            </Text>
                        </Label>
                        <Select onValueChange={(e: any) => setSelectedMataKuliah(e?.value)}>
                            <SelectTrigger className='w-full'>
                                <SelectValue
                                    style={{
                                        fontFamily: "Manrope_400Regular"
                                    }}
                                    className='text-foreground text-sm native:text-lg'
                                    placeholder='Pilih matakuliah'
                                />
                            </SelectTrigger>
                            <SelectContent insets={contentInsets} className='mt-2 w-[350px]'>
                                <SelectGroup>
                                    <SelectLabel style={{ fontFamily: "Manrope_700Bold" }}>Matakuliah</SelectLabel>
                                    <SelectItem label='Semua' value=''>
                                        Semua
                                    </SelectItem>
                                    {
                                        matakuliah.map((item: any, index) => (
                                            <SelectItem key={index} label={item.subject_name} value={item.subject_id}>
                                                {item.subject_name}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </View>
                    <View className='flex w-full gap-3'>
                        <Label nativeID='inputSearch' style={{
                            fontFamily: "Manrope_600SemiBold"
                        }}>
                            <Text className='text-xl'>Cari tools</Text>
                        </Label>
                        <View className='flex flex-row'>
                            <Input
                                value={search}
                                placeholder='Masukkan keyword'
                                className='w-full'
                                style={{
                                    fontFamily: "Manrope_400Regular"
                                }}
                                onChangeText={setSearch}
                                aria-labelledby='inputSearch'
                                aria-errormessage='passwordError'
                            />
                            <Button variant={'link'} className='absolute -right-1'>
                                <Search size={15} strokeWidth={1.5} className=' w-4 h-4 text-foreground/70' />
                            </Button>


                        </View>
                    </View>
                    <View>
                        <FlatList data={tool} contentContainerClassName='gap-4' renderItem={({ item }) => (
                            <Pressable onPress={() => router.push({
                                pathname: "/(home)/[id]",
                                params: { id: item.tool_id }
                            })}>
                                <Card className='w-full'>
                                    <CardContent className='flex flex-row gap-4 items-center p-3'>
                                        <Image source={{ uri: item.imageuri }} className='rounded-lg w-10 h-10' />
                                        <Text className='text-xl' style={{ fontFamily: "Manrope_700Bold" }}>{item.title}</Text>
                                    </CardContent>
                                </Card>
                            </Pressable>
                        )} />

                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}