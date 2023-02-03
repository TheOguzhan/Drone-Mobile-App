import React from 'react'
import { Link, Slot } from 'expo-router'
import { SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

const AppLayout = () => {
  return (
    <SafeAreaView className='flex-1 bg-slate-200'>
      <Slot />
    </SafeAreaView>
  )
}

export default AppLayout

