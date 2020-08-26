import React from 'react';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { withNavigationFocus, NavigationActions } from 'react-navigation';
import { useIsFocused, CommonActions, StackActions } from '@react-navigation/native';

const Scanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const onBarCodeScanned = (object) => {
        Vibration.vibrate();
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'Details',
                params: {
                    data: object.data
                },
                key: Math.random()*10000
            })
        )
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View>
            {
                isFocused &&
                <Camera
                    style={{ height: 400, width: "100%" }}
                    type={Camera.Constants.Type.back}
                    onBarCodeScanned={onBarCodeScanned}

                ></Camera>
            }
        </View>
    );
};

export default withNavigationFocus(Scanner);