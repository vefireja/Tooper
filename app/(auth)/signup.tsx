import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native'
import React, { useState } from 'react'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Eye } from '~/lib/icons/Eye'
import { EyeOff } from '~/lib/icons/EyeOff'
import InputSelect from '~/components/InputSelect';
import { supabase } from '~/lib/supabase';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [jurusan, setJurusan] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        if (password !== confirmPassword) {
            setLoading(false);
            return Alert.alert("Password doesn't match");
        }
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                    program_id: jurusan
                }
            }
        });

        if (error) {
            Alert.alert(error.message);
        } else {
            Alert.alert("Success!");
        }
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
                        Sign Up
                    </Text>
                    <Text className='text-zinc-500 text-xl' style={{
                        fontFamily: "Manrope_300Light"
                    }}>Ayo bergabung bersama{' '}
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
                    <Label nativeID='inputFullName' >
                        <Text className='text-xl' style={{
                            fontFamily: "Manrope_600SemiBold"
                        }}>Nama Lengkap</Text>
                    </Label>
                    <Input
                        placeholder='John Doe'
                        value={fullName}
                        className='w-full'
                        style={{
                            fontFamily: "Manrope_400Regular"
                        }}
                        onChangeText={setFullName}
                        aria-labelledby='inputFullName'
                        aria-errormessage='fullNameError'
                        keyboardType='default'
                        autoComplete='off'
                    />
                </View>
                <View className='flex w-full gap-3'>
                    <Label >
                        <Text className='text-xl' style={{
                            fontFamily: "Manrope_600SemiBold"
                        }}>Jurusan</Text>
                    </Label>
                    <InputSelect handleOnValueChange={setJurusan} />
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
                            {/* <EyeOff size={15} strokeWidth={1.5} className='w-4 h-4 text-foreground/70' /> */}
                        </Button>
                    </View>
                </View>
                <View className='flex w-full gap-3'>
                    <Label nativeID='inputConfirmPassword' style={{
                        fontFamily: "Manrope_600SemiBold"
                    }}>
                        <Text className='text-xl'>Konfirmasi Password</Text>
                    </Label>
                    <View className='flex flex-row'>
                        <Input
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            className='w-full'
                            style={{
                                fontFamily: "Manrope_400Regular"
                            }}
                            onChangeText={setConfirmPassword}
                            aria-labelledby='inputConfirmPassword'
                            aria-errormessage='ConfirmPasswordError'
                        />
                        <Button variant="link" onPress={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute -right-1'>
                            {showConfirmPassword ?
                                <Eye size={15} strokeWidth={1.5} className='w-4 h-4 text-foreground/70' /> :
                                <EyeOff size={15} strokeWidth={1.5} className='w-4 h-4 text-foreground/70' />
                            }
                        </Button>
                    </View>
                </View>
                <Button disabled={loading} variant='default' onPress={()=>{
                    console.log(typeof(jurusan));
                    
                    signUpWithEmail()
                    }} className='w-full'>
                    <Text className='text-xl' style={{
                        fontFamily: "Manrope_400Regular"
                    }}>Daftar</Text>
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}