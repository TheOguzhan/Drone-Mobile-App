import { Slot } from 'expo-router'
import React from 'react'
import { AuthProvider } from '../context/AuthContext'
import { ProductProvider } from '../context/OrderContext'

export default RootLayout = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Slot />
      </ProductProvider>
    </AuthProvider>
  )
}

