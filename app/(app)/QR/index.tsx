import * as React from 'react';

import { StyleSheet, Text } from 'react-native';
import { CameraDeviceFormat, useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { usePhysicalCameraDevices } from '../../../hooks';
const index = () => {
    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const physicalDevices = usePhysicalCameraDevices(devices);
    const device = physicalDevices.back;
    // and then call it:
    const formats = React.useMemo(() => device?.formats.sort(sortFormatsByResolution), [device?.formats])


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
                    frameProcessor={frameProcessor}
                    format={formats[0]}
                    frameProcessorFps={5}
                    fps={30}
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

export const sortFormatsByResolution = (left: CameraDeviceFormat, right: CameraDeviceFormat): number => {
    // in this case, points aren't "normalized" (e.g. higher resolution = 1 point, lower resolution = -1 points)
    let leftPoints = left.photoHeight * left.photoWidth
    let rightPoints = right.photoHeight * right.photoWidth

    // we also care about video dimensions, not only photo.
    leftPoints += left.videoWidth * left.videoHeight
    rightPoints += right.videoWidth * right.videoHeight

    // you can also add points for FPS, etc

    return rightPoints - leftPoints
}