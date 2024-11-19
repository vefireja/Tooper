
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import { useAuth } from '~/provider/AuthProviders'

export default function AuthLayout() {
  const {user} = useAuth()
  if(user) {
    return <Redirect href="/(home)"/>
  }

  return (
    <Slot/>
  )
}