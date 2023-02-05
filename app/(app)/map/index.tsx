import { FlatList, Pressable, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapLibreGL from '@maplibre/maplibre-react-native';
import { MapTilerStyleAPIKEY } from '../../../env';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);


const index = () => {
    const flatListRef = useRef<FlatList<FlyPoint>>();

    const flyPoints: FlyPoint[] = [{
        geoPoint: [28.973629745897615, 41.012081823738725],
        name: "İstanbul Erkek Lisesi",
        description: "Main cargo warehouse in project",
        address: "Hobyar Mah. Türkocağı Cad. 34112 Fatih/İstanbul"
    }, {
        geoPoint: [29.000226495219824, 41.039423020861996],
        name: "Dolmabahçe Palace",
        description: "Cargo warehouse for Beşiktaş Province",
        address: "Vişnezade, Dolmabahçe Cd., 34357 Beşiktaş/İstanbul"
    },
    {
        geoPoint: [29.004109123522092, 41.022312764680024],
        name: "Maiden's Tower",
        description: "Cargo warehouse for Kadıköy and Üsküdar Province",
        address: "Salacak, 34668 Üsküdar/İstanbul"
    }]
    const [pointIndex, setPointIndex] = useState<number>(0);
    useEffect(() => {
        flatListRef.current.scrollToIndex({
            animated: true,
            index: pointIndex,
        });
    }, [pointIndex])
    return (
        <View className='h-full flex flex-1 justify-center align-center'>
            <MapLibreGL.MapView
                className='flex-1 self-stretch'
                styleURL={
                    `https://api.maptiler.com/maps/streets/style.json?key=${MapTilerStyleAPIKEY}`
                }
                animated
                localizeLabels
                compassEnabled
            >
                <MapLibreGL.Camera
                    animationDuration={2000}
                    animationMode='flyTo'
                    centerCoordinate={flyPoints[pointIndex].geoPoint}
                    zoomLevel={12}
                />
                {flyPoints.map((element, index) => {

                    return <MapLibreGL.PointAnnotation
                        coordinate={element.geoPoint}
                        id={element.name}
                        key={index}
                        onSelected={() => {
                            setPointIndex(index)
                        }}
                    />
                })}
            </MapLibreGL.MapView>
            <MapOverlayList flyPoints={flyPoints} flatListRef={flatListRef} setPointIndex={setPointIndex} />
        </View>
    )
}


interface FlyPoint {
    geoPoint: GeoJSON.Position
    name: string
    description: string
    address: string
}
interface MapOverlayListProps {
    flyPoints: FlyPoint[]
    flatListRef: React.MutableRefObject<FlatList<FlyPoint>>
    setPointIndex: React.Dispatch<React.SetStateAction<number>>
}

const MapOverlayList: React.FC<MapOverlayListProps> = ({ flyPoints, flatListRef, setPointIndex }) => {
    return (
        <FlatList
            className='w-full absolute bottom-12 right-0 left-0'
            data={flyPoints}
            renderItem={({ item, index }) => {
                return (
                    <Pressable className='h-40 w-64 m-8 bg-white p-5 justify-center items-center text-center' onPress={() => {
                        setPointIndex(index)
                    }}>
                        <Text className='text-lg text-black text-center'>{item.name}</Text>
                        <Text className='text-sm text-black text-center'>X: {item.geoPoint[0]};
                            {"\n"} Y:{item.geoPoint[1]} </Text>
                        <Text className='text-md text-black text-center'>{item.description}</Text>
                        <Text className='text-md text-black text-center'>{item.address}</Text>
                    </Pressable>)
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            contentContainerStyle={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}
        />
    )
}

export default index;