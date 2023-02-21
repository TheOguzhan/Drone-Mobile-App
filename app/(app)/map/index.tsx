import { Alert, FlatList, Pressable, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapLibreGL from '@maplibre/maplibre-react-native';
import { MapTilerStyleAPIKEY } from '../../../env';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);


const index = () => {

    const getNearestFlyPoint = (location: GeoJSON.Position, flyPoints: FlyPoint[]): FlyPoint => {
        const sortedFlyPoints = flyPoints.sort((a, b) => {
            const distanceA =
                Math.sqrt(
                    Math.pow(location[0] - a.geoPoint[0], 2) +
                    Math.pow(location[1] - a.geoPoint[1], 2)
                );
            const distanceB =
                Math.sqrt(
                    Math.pow(location[0] - b.geoPoint[0], 2) +
                    Math.pow(location[1] - b.geoPoint[1], 2)
                );
            return distanceA - distanceB;
        });

        return sortedFlyPoints[0];
    };


    const [location, setLocation] = useState<Location.LocationObject>(null);
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
    },
    {
        geoPoint: [10.011271352302977, 53.547907488975014],
        name: 'a&o hostels',
        description: "Cargo warehouse for Hamburg General",
        address: 'Amsinckstraße 2-10, 20097 Hamburg, Germany',
    },
    {
        geoPoint: [9.997799416552724, 53.63446198883239],
        name: 'Hamburg Flughafen',
        description: "Airport warehouse",
        address: '9.997799416552724',
    },
    ]
    const [point, setPoint] = useState<GeoJSON.Position>(flyPoints[0].geoPoint);
    useEffect(() => {
        const pointIndex = flyPoints.findIndex(flyPoint => flyPoint.geoPoint.every((coord, i) => coord === point[i]));
        if (pointIndex !== -1) {
            flatListRef.current.scrollToIndex({
                animated: true,
                index: pointIndex,
            });
        } else return;
    }, [point])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Location is needed to use the app');
                return;
            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: 5,
            })
            setLocation(location);
            setPoint(getNearestFlyPoint(
                [location.coords.longitude, location.coords.latitude],
                flyPoints).geoPoint)
        })()
    }, [])

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
                    centerCoordinate={point}
                    zoomLevel={13}
                />
                {flyPoints.map((element, index) => {

                    return <MapLibreGL.PointAnnotation
                        coordinate={element.geoPoint}
                        id={element.name}
                        key={index}
                        onSelected={() => {
                            setPoint(element.geoPoint);
                        }}
                    />
                })}
                {location && <MapLibreGL.PointAnnotation
                    coordinate={[location.coords.longitude, location.coords.latitude]}
                    id='user'
                />}
            </MapLibreGL.MapView>
            <MapOverlayList flyPoints={flyPoints} flatListRef={flatListRef} setPoint={setPoint} />
            <Pressable className='h-12 w-12 bottom-4 right-4 bg-white rounded-full absolute flex justify-center items-center' onPress={() => {
                if (location) {
                    setPoint([location.coords.longitude, location.coords.latitude])
                }
            }}>
                {location ? <MaterialIcons name="my-location" size={24} color={location.coords.longitude === point[0] && location.coords.latitude === point[1] ? "#60A5FA" : "#374151"} /> : <MaterialIcons name="location-searching" size={24} color="#EF4444" />}
            </Pressable>
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
    setPoint: React.Dispatch<React.SetStateAction<GeoJSON.Position>>
}

const MapOverlayList: React.FC<MapOverlayListProps> = ({ flyPoints, flatListRef, setPoint }) => {
    return (
        <FlatList
            className='w-full absolute bottom-12 right-0 left-0'
            data={flyPoints}
            renderItem={({ item, index }) => {
                return (
                    <Pressable className='h-40 w-64 m-8 bg-white p-5 justify-center items-center text-center' onPress={() => {
                        setPoint(item.geoPoint)
                    }}>
                        <Text className='text-lg text-black text-center'>{item.name}</Text>
                        <Text className='text-md text-black text-center'>{item.description}</Text>
                        <Text className='text-md text-black text-center'>{item.address}</Text>
                    </Pressable>)
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            contentContainerStyle={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
        />
    )
}

export default index;