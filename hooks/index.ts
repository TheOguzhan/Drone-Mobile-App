import { useEffect, useState } from "react";
import { Camera, CameraDevices, sortDevices } from "react-native-vision-camera";

export const usePhysicalCameraDevices = (default_camera_devices: CameraDevices): CameraDevices => {
    const [cameraDevices, setCameraDevices] = useState<CameraDevices>(
        default_camera_devices,
    );

    useEffect(() => {
        let isMounted = true;

        const loadDevice = async (): Promise<void> => {
            const devices = await Camera.getAvailableCameraDevices();
            if (!isMounted) return;

            const prioritizedDevices = devices.sort(sortDevices);
            const physicalDevices = prioritizedDevices.filter(d => !d.isMultiCam);

            setCameraDevices({
                back: physicalDevices.find(d => d.position === 'back'),
                external: physicalDevices.find(d => d.position === 'external'),
                front: physicalDevices.find(d => d.position === 'front'),
                unspecified: physicalDevices.find(d => d.position === 'unspecified'),
            });
        };
        loadDevice();

        return () => {
            isMounted = false;
        };
    }, []);

    return cameraDevices;
};