import { SafeAreaView, StyleSheet, ScrollView, View, PermissionsAndroid, TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator, Button, Card, MD2Colors, MD3Colors, Text, useTheme } from "react-native-paper";
// import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";
import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
import * as React from "react";
import { Animated } from "react-native";
import { Vibration } from 'react-native';

export default function CameraScreen() {

    const [facing, setFacing] = React.useState('back');
    const [cameraPermission, setCameraPermission] = React.useState(null);
    const [locationPermission, setLocationPermission] = React.useState(null);
    const [mediaPermission, setMediaPermission] = React.useState(null);
    const [storagePermission, setStoragePermission] = React.useState(null);
    const [writeStoragePermission, setWriteStoragePermission] = React.useState(null);
    const cameraRef = React.useRef(null); // Camera reference for tap-to-focus
    const [isPermissionGranted, setIsPermissionGranted] = React.useState(false);
    const theme = useTheme();
    const scaleValue = new Animated.Value(1); // Initial scale (normal size)

    React.useEffect(() => {
        const init = async () => {
            await requestPermissions();
            Animated.timing(scaleValue, {
                toValue: 10, // Scale it up to 2x
                duration: 7000, // 1.5 seconds duration
                useNativeDriver: true, // Enables GPU-based animation for better performance
            }).start();
        };
        init();
    }, []);


    const requestPermissions = async () => {
        try {
            const cameraPermissionStatus = await Camera.Camera.getCameraPermissionsAsync()
            console.log(cameraPermissionStatus);
            const locationPermissionStatus = await Location.requestForegroundPermissionsAsync();
            console.log(locationPermissionStatus);
            const mediaPermissionStatus = await MediaLibrary.requestPermissionsAsync();
            console.log(mediaPermissionStatus);
            const storagePermissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            console.log(storagePermissionStatus);
            const writeStoragePermissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            console.log(writeStoragePermissionStatus);

            setCameraPermission(cameraPermissionStatus.status);
            setLocationPermission(locationPermissionStatus.status);
            setMediaPermission(mediaPermissionStatus.status);
            setStoragePermission(storagePermissionStatus);
            setWriteStoragePermission(writeStoragePermissionStatus);

            if (
                cameraPermissionStatus.granted &&
                locationPermissionStatus.granted &&
                mediaPermissionStatus.granted &&
                storagePermissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN &&
                writeStoragePermissionStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
            ) {
                setIsPermissionGranted(true);
            }
        } catch (error) {
            console.error('Error requesting permissions: ', error);
        }
    };

    const toggleCameraFacing = () => {
        setFacing((prevFacing) => (prevFacing === 'back' ? 'front' : 'back'));
    };

    if (!isPermissionGranted) {
        return (
            <SafeAreaView style={[styles.container, { alignItems: 'center', justifyContent: 'center', alignContent: 'center',backgroundColor:theme.colors.surface }]}>

                <ActivityIndicator animating={true} color={MD3Colors.primary30} />
            </SafeAreaView>
        );
    }
    var i = 0
    const handleBarcodeScanned = ({ type, data }) => {
        console.log(`Barcode scanned! Type: ${type}, Data: ${data}`);

        if (i === 0) {
            Vibration.vibrate(700); // 500 ms vibration duration
            i += 1
        }
        // Trigger the vibration
    };


    // Handle tap-to-focus
    const handleTapToFocus = async (e) => {
        if (cameraRef.current) {
            const { locationX, locationY } = e.nativeEvent; // Get tap location
            const focusPoint = {
                x: locationX / e.target.width, // Normalize to camera frame
                y: locationY / e.target.height, // Normalize to camera frame
            };

            // Set the focus point based on tap location
            await cameraRef.current.setFocusPoint(focusPoint);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            {/* Full-screen camera view */}

            <Camera.CameraView
                style={styles.camera}
                facing={facing}
                ref={cameraRef}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            >
                {/* Overlay with black background and clear center */}
                {/* <View style={styles.overlay}> */}
                {/* Clear center rectangle */}

                {/* Tap-to-focus overlay
                <TouchableWithoutFeedback onPress={handleTapToFocus}>
                    <View style={styles.touchableArea} />
                </TouchableWithoutFeedback> */}
            </Camera.CameraView>
            <View style={styles.scanArea} >

                <Animated.View
                    style={[
                        styles.scanArea,
                        {
                            // Applying scale and rotation transformations
                            transform: [
                                { scale: scaleValue },
                                { rotateY: "90deg" },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.text}>Animated Box</Text>
                </Animated.View>
            </View>


        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
    },
    camera: {
        flex: 1,                    // This ensures the camera takes up all available space.
        justifyContent: "center",   // Center the content inside the camera view.
        alignItems: "center",       // Center the content inside the camera view.
        width: "100%",              // Take full width of the screen.
        height: "100%",             // Take full height of the screen.
        position: "absolute",       // Absolute positioning makes it take up the entire screen without other content overlapping.
        top: 0,                     // Aligns it to the top of the screen.
        left: 0,                    // Aligns it to the left of the screen.
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: '#1A6DD5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // Apply perspective on the parent container for 3D effect
        transformStyle: 'preserve-3d',
        zIndex: 3,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent overlay
        justifyContent: "center",
        alignItems: "center", // Center the scanArea in the middle
        // zIndex: 1, // Overlay is above the camera
    },
    scanArea: {
        width: 250,                // Set the width of the scanning area
        height: 250,               // Set the height of the scanning area
        borderColor: "white",      // Border color of the scanning area
        borderWidth: 2,            // Border width of the scanning area
        borderRadius: 10,          // Border radius for rounded corners
        backgroundColor: "transparent",  // Transparent center where the camera feed will be visible
        // zIndex: 2,                 // Make sure the scanArea is above the overlay
        // position: "absolute",      // Position it absolutely within the parent container
        top: "50%",                // Position from the top 50% of the screen height
        left: "50%",               // Position from the left 50% of the screen width
        transform: [
            { translateX: -125 },    // Offset the area to the left by half its width (250/2)
            { translateY: -125 },    // Offset the area upwards by half its height (250/2)
        ],
    },
    touchableArea: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#6200ee",
        color: "white",
    },
    message: {
        textAlign: "center",
        marginTop: 20,
    }, text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});