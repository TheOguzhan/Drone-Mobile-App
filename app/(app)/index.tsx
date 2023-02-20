import { Image, View, FlatList, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router';
import { Item, DATA } from '../../data';
import { Feather } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore'


interface FeaturedItemsListProps {
  items: Array<Item>
}

const index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<Item>>([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('items')
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach(documentSnapshot => {
          items.push({ ...documentSnapshot.data(), item_id: documentSnapshot.id})
        })
        setItems(items);
        setLoading(false);
      })
      return () => subscriber();
  }, [])
  if (loading) {
    return <View className="flex-1">
      <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
        <TextInput className="px-4 py-2 w-2/3 bg-white rounded-md" placeholder='Search' />
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
  return (
    <View className="flex-1">
      <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
        <TextInput className="px-4 py-2 w-2/3 bg-white rounded-md" placeholder='Search' />
        <TouchableOpacity activeOpacity={0.8}>
          <Link href={{
            pathname: "/(app)/settings/",
          }}>
            <Feather name="settings" size={24} color="white" />
          </Link>
        </TouchableOpacity>
      </View >

      <View className="flex-1 px-4 py-2">
        <Text className='text-xl'>Featured Items</Text>
        <FeaturedItemsList items={items} />
      </View>
    </View>
  )
}

const FeaturedItemsList: React.FC<FeaturedItemsListProps> = ({ items }) => {
  return (<FlatList
    data={items}
    keyExtractor={item => item.item_id}
    renderItem={({ item }) => {
      return (
        <Link href={{
          pathname: "/(app)/items/[item_id]",
          params: {
            item_id: item.item_id,
          }
        }}>
          <View className="w-40 h-40 justify-center items-center">
            <Image source={{ uri: item.item_photo }} className="w-32 h-32" />
            <Text>{item.item_name} - {item.item_price}€</Text>
          </View>
        </Link>
      )
    }}
    showsHorizontalScrollIndicator={false}
    horizontal={true}
  />)
}

export default index;

