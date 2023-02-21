import { Image, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter, useSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import { QRList } from '../../../QRs';
import { useOrders, Item as ItemInterface } from '../../../context/OrderContext';

const Item = () => {
  const { item_id } = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<ItemInterface>(null);
  const router = useRouter();
  const { pushOrder } = useOrders(); 
  useEffect(() => {
    const subscriber = firestore()
      .collection('items')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach(documentSnapshot => {
          items.push({ ...documentSnapshot.data(), item_id: documentSnapshot.id })
        })
        setItem(items.filter(data_item => data_item.item_id === item_id)[0]);
        setLoading(false);
      })
    return () => subscriber();
  }, [])
  if (loading) {
    return <View className='flex-1'>
      <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
        <TouchableOpacity activeOpacity={0.8}>
          <Link href={{
            pathname: "/(app)/settings/",
          }}>
            <Feather name="settings" size={24} color="white" />
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  }
  if (item !== undefined && item !== null) {

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

          <TouchableOpacity className='bg-pink-500 mt-6 py-4 px-9 rounded-xl' activeOpacity={0.9} onPress={() => {
            const QR_uuid = QRList[Math.floor(Math.random() * QRList.length)];
            pushOrder({ ...item, qr_uuid: QR_uuid })
            router.push('/(app)/orders')
          }}>
            <Text className='text-white text-md '>Order Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  else {
    router.push('/(app)')
    return;
  }
}

export default Item;

