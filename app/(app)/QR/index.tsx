import * as React from 'react';

import { StyleSheet, Text } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { usePhysicalCameraDevices } from '../../../hooks';
const index = () => {
    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const physicalDevices = usePhysicalCameraDevices(devices);
    const device = physicalDevices.back;
    const formats = React.useMemo(() => {
        if (device?.formats == null) return [];
        return device.formats;
    }, [device?.formats]);
    const format = React.useMemo(() => {
        return formats[formats.length - 1];
    }, [formats]);

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: false,
    });


    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    return (
        device != null &&
        hasPermission && (
            <>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    format={format}
                    frameProcessor={frameProcessor}
                    frameProcessorFps={5}
                />
                {barcodes.map((barcode, idx) => (
                    <Text key={idx} style={styles.barcodeTextURL}>
                        {barcode.displayValue}
                    </Text>
                ))}
            </>
        )
    );
}

const styles = StyleSheet.create({
    barcodeTextURL: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default index