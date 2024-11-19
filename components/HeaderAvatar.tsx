import {  Text } from 'react-native'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function HeaderAvatar() {
    return (
        <Avatar alt="Rick Sanchez's Avatar" className='w-11 h-11'>
            <AvatarImage source={{ uri: "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg" }} />
            <AvatarFallback>
                <Text>RS</Text>
            </AvatarFallback>
        </Avatar>
    )
}