import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from "expo-router";

const index = () => {

    return (
        <SafeAreaView className="flex-1 justify-center bg-slate-200 px-10 gap-3">
            <Text className="text-gray-800 text-2xl text-center">IEL AERIAL Drone System</Text>
            <Text className="text-gray-800 text-l text-center">Register</Text>
            <TextInput className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl" placeholder='Email' autoComplete='email' keyboardType='email-address' />
            <TextInput className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl" placeholder='Password' secureTextEntry={true} />
            <TextInput className="border-2 border-gray-800  px-5 py-2 m-1 rounded-xl" placeholder='Password Confirm' secureTextEntry={true} />
            <TouchableOpacity className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl" activeOpacity={0.8}>
                <Text className='text-center text-l '>Register</Text>
            </TouchableOpacity>
            <Link href="/" className='text-center text-cyan-900'>Has account? Login</Link>

        </SafeAreaView>
    )
}

export default index
