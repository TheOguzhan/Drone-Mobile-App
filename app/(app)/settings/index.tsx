import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { logout } from '../../../firebase/functions';
import { Link, useRouter } from 'expo-router';

const index = () => {
  const { user } = useAuth();
  return (
    <View className='flex-1'>
      <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
        <View className="px-4 py-2 w-2/3 rounded-md">
          <Text className='text-md text-white text-center'>{user?.email}</Text>
          <Text className='text-md text-white text-center'>{user?.phoneNumber}</Text>
        </View>
        <Image className='h-12 w-12 rounded-full' source={{ uri: `https://api.dicebear.com/5.x/fun-emoji/png?seed=${user ? user.email : "random seed"}` }} />
      </View>
      <View className='px-10 py-5 flex-1'>
        <TouchableOpacity
          className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl"
          activeOpacity={0.8}
          onPress={() => {
            logout();
          }}
        >
          <Text className="text-center text-l ">Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl"
          activeOpacity={0.8}
        >
          <Link href={{pathname: '/(app)/map'}} className="text-center text-l ">Map</Link>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl"
          activeOpacity={0.8}
        >
          <Link href={{ pathname: '/(app)/QR' }} className="text-center text-l ">QR Scanner</Link>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default index
