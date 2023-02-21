import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useOrders } from '../../../context/OrderContext';
import { Link, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';


const index = () => {
    const router = useRouter();
    const { orders } = useOrders();
    return (
        <View className='flex-1'>
            <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
                <Text className='text-xl text-white text-center w-2/3'>Orders</Text>
                <TouchableOpacity activeOpacity={0.8}>
                    <Link href={{
                        pathname: "/(app)/settings/",
                    }}>
                        <Feather name="settings" size={24} color="white" />
                    </Link>
                </TouchableOpacity>
            </View >
            <View className='px-10 py-5 flex-1'>
                {
                    orders.length === 0 ?
                        <Text className="text-center text-l ">No previous orders were found</Text>
                        :
                        orders.map((order, index) => {
                            return (<TouchableOpacity
                                className="border-2 bg-slate-100 border-gray-800 px-5 py-2 my-1 rounded-xl"
                                activeOpacity={0.8}
                                onPress={() => {
                                    router.push({ pathname: "/(app)/orders/[order_qr]", params: { order_qr: order.qr_uuid } })
                                }}
                            >
                                <Text className="text-center text-l" key={index}>Order {index + 1} - {order.item_name}</Text>
                            </TouchableOpacity>)
                        })
                }


            </View>
        </View>
    )
}

export default index
