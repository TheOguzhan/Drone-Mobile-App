import { Slot } from 'expo-router'
import React from 'react'
import { AuthProvider } from '../context/AuthContext'

export default RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}

