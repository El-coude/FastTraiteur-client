import MapboxGL, { MapView, Camera } from "@rnmapbox/maps";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PrimaryButton } from "./Button";
import { StyleSheet, View } from "react-native";
import Geo from "@mapbox/mapbox-sdk/services/geocoding";

MapboxGL.setAccessToken(
    "pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q"
);
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    markerContainer: {
        width: 20,
        height: 30,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -10 }, { translateY: -45 }],
    },
    markerTop: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "black",
        backgroundColor: "transparent",
    },
    markerBottom: {
        width: 4,
        height: 10,
        backgroundColor: "black",
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginTop: -2,
        alignSelf: "center",
    },
});

const PickFromMap = ({
    setInfo,
    default: defaultPos,
}: {
    close: () => void;
    setInfo: Dispatch<
        SetStateAction<{
            visible: boolean;
            latitud?: number;
            longtitud?: number;
            address?: string;
        }>
    >;
    default?: [number, number];
}) => {
    const [cords] = useState({
        longtitud: defaultPos ? defaultPos[1] : 1.105,
        latitud: defaultPos ? defaultPos[0] : 34.906,
    });
    const mapRef = useRef<MapView>(null!);
    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false);
    }, []);

    const fetchLocationInfo = async (longitude: number, latitude: number) => {
        const geo = Geo({
            accessToken:
                "pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q",
        });
        try {
            // Make a reverse geocoding request
            const response = await geo
                .reverseGeocode({
                    query: [longitude, latitude],
                    types: ["address", "place"],
                    limit: 1,
                })
                .send();

            // Extract the city and address from the response
            const features = response.body.features;
            if (features.length > 0) {
                const city = features[0]?.context?.find((c) =>
                    c?.id?.includes("place")
                )?.text;
                const address = features[0].place_name;
                console.log("Address:", address);
                return address;
            } else {
                console.log("Location not found.");
                return `${longitude} | ${latitude}`;
            }
        } catch (error) {
            console.error("Error:", (error as any).message);
            return `${longitude} | ${latitude}`;
        }
    };

    return (
        <>
            <View className="absolute top-0 rounded-lg left-0 z-20  w-screen h-[80vh]">
                <MapboxGL.MapView ref={mapRef} style={styles.map} zoomEnabled>
                    <Camera
                        zoomLevel={6}
                        centerCoordinate={[cords.longtitud, cords.latitud]}
                    />
                </MapboxGL.MapView>
                <PrimaryButton
                    title="Confirm"
                    style="w-full"
                    onPress={async () => {
                        const center = await mapRef.current?.getCenter();
                        const address = await fetchLocationInfo(
                            center[0],
                            center[1]
                        );
                        setInfo({
                            longtitud: center[0],
                            latitud: center[1],
                            address: address,
                            visible: false,
                        });
                    }}
                />
                <View style={styles.markerContainer}>
                    <View style={styles.markerTop} />
                    <View style={styles.markerBottom} />
                </View>
            </View>
        </>
    );
};

export default PickFromMap;
