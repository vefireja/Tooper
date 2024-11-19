import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Link } from 'expo-router';
import { Eye } from '~/lib/icons/Eye'
import { EyeOff } from '~/lib/icons/EyeOff'
import { supabase } from '~/lib/supabase';
import { useAuth } from '~/provider/AuthProviders';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { profile } = useAuth()

    console.log(profile);
    

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
                <View className='w-full'>
                    <Text className='text-4xl mb-1' style={{
                        fontFamily: "Manrope_700Bold"
                    }}>
                        Sign In
                    </Text>
                    <Text className='text-zinc-500 text-xl' style={{
                        fontFamily: "Manrope_300Light"
                    }}>Persiapkan peralatan perkuliahan mu bersama{' '}
                        <Text style={{
                            fontFamily: "Manrope_700Bold"
                        }} className='text-[#FED542] text-xl'>
                            Too
                            <Text className='text-[#093DF4] text-xl'>
                                per
                            </Text>
                        </Text>
                    </Text>
                </View>
                <View className='flex w-full gap-3'>
                    <Label nativeID='inputEmail' >
                        <Text className='text-xl' style={{
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
                <View className='flex w-full gap-3'>
                    <Label nativeID='inputPassword' style={{
                        fontFamily: "Manrope_600SemiBold"
                    }}>
                        <Text className='text-xl'>Password</Text>
                    </Label>
                    <View className='flex flex-row'>
                        <Input
                            secureTextEntry={!showPassword}
                            value={password}
                            className='w-full'
                            style={{
                                fontFamily: "Manrope_400Regular"
                            }}
                            onChangeText={setPassword}
                            aria-labelledby='inputPassword'
                            aria-errormessage='passwordError'
                        />
                        <Button variant="link" onPress={() => setShowPassword(!showPassword)} className='absolute -right-1'>
                            {showPassword ?
                                <Eye size={15} strokeWidth={1.5} className='w-4 h-4 text-foreground/70' /> :
                                <EyeOff size={15} strokeWidth={1.5} className='w-4 h-4 text-foreground/70' />
                            }
                        </Button>
                    </View>
                </View>
                <Button variant='default' onPress={signInWithEmail} className='w-full'>
                    <Text className='text-xl' style={{
                        fontFamily: "Manrope_400Regular"
                    }}>Masuk</Text>
                </Button>
                <Text style={{
                    fontFamily: "Manrope_400Regular"
                }}>
                    Belum punya akun?{' '}
                    <Link className='text-blue-500' href="/signup">
                        Daftar sekarang
                    </Link>
                </Text>
            </View>
        </KeyboardAvoidingView>
    )
}