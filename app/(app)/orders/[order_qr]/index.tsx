import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter, useSearchParams } from 'expo-router';
import { Camera, CameraDeviceFormat, useCameraDevices } from 'react-native-vision-camera';
import { usePhysicalCameraDevices } from '../../../../hooks';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { useOrders } from "../../../../context/OrderContext";

const index = () => {
    const { order_qr } = useSearchParams();
    return (
        <View className='flex-1'>
            <View className="h-28 bg-pink-800 w-full pt-10 pb-6 px-4 rounded-md justify-around items-center flex-row">
                <View className="px-4 py-2 w-2/3 rounded-md">
                    <Text className='text-md text-white text-center'>Order ID: {order_qr}</Text>
                </View>

            </View>
            <View className='px-10 py-5 flex-1'>
                <QRCameraView order_qr={order_qr} />
            </View>
        </View>
    )
}

interface QRCameraViewProps {
    order_qr: string
}

const QRCameraView: React.FC<QRCameraViewProps> = ({ order_qr }) => {
    const router = useRouter();
    const [hasPermission, setHasPermission] = React.useState(false);
    const devices = useCameraDevices();
    const physicalDevices = usePhysicalCameraDevices(devices);
    const device = physicalDevices.back;
    // and then call it:
    const formats = React.useMemo(() => device?.formats.sort(sortFormatsByResolution), [device?.formats])
    const { removeByItem, getOrderByQRUUID } = useOrders();
    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: false,
    });


    React.useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    if (barcodes && barcodes.length > 0 && barcodes[0].displayValue === order_qr) {
        Alert.alert(
            'QR successfully matched',
            'Your order is successfully matched',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        let item = getOrderByQRUUID(order_qr);
                        if (item) {
                            removeByItem(item);
                        }
                        router.push('/(app)')
                    },
                    style: 'default',
                },
            ],
            {
                onDismiss: () => {
                    let item = getOrderByQRUUID(order_qr);
                    if (item) {
                        removeByItem(item);
                    }
                    router.push('/(app)')
                }
            });
    }

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
            </>
        )
    );
}

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

export default index

const styles = StyleSheet.create({})