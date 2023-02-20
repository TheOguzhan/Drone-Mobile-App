import { Image, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { Link, useSearchParams } from 'expo-router'
import { DATA, Item as ItemInterface } from '../../../data';
import { Feather } from '@expo/vector-icons';

const Item = () => {
  const { item_id } = useSearchParams();
  console.log(item_id);
  const item: ItemInterface = DATA.filter(data_item => data_item.item_id === item_id)[0];
  return (
    <View className='flex-1'>
      <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
        <Text className='text-xl text-white text-center w-2/3'>{item.item_name}</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Link href={{
            pathname: "/(app)/settings/",
          }}>
            <Feather name="settings" size={24} color="white" />
          </Link>
        </TouchableOpacity>
      </View >
      <View className='flex-1 mx-4 mt-4 mb-12 items-center'>
        <Image source={{ uri: item.item_photo }} className='h-40 w-40 mt-12 mb-6' />
        <Text className='text-lg'>{item.item_price}€</Text>
        <TouchableOpacity className='bg-pink-500 mt-6 py-4 px-9 rounded-xl' activeOpacity={0.9}>
          <Text className='text-white text-md '>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Item;

