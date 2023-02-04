import { View, StyleSheet } from 'react-native'
import React from 'react'
import MapLibreGL from '@maplibre/maplibre-react-native';
import { MapTilerStyleAPIKEY } from '../../../env';

MapLibreGL.setAccessToken(null);
MapLibreGL.setConnected(true);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

const index = () => {
    return (
        <View style={styles.page}>
            <MapLibreGL.MapView
                style={styles.map}
                logoEnabled={false}
                styleURL={`https://api.maptiler.com/maps/streets/style.json?key=${MapTilerStyleAPIKEY}`}
            />
        </View>
    )
}

export default index;