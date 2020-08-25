import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Icon } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import {BarCodeScanner} from 'expo-barcode-scanner';

const Scanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [loaded, setLoaded] = useState(false);

    props.navigation.addListener('focus', () => {
        setLoaded(true);
    });
    props.navigation.addListener('blur', () => {
        setLoaded(false);
    });

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const onBarCodeScanned = (object) => {
        props.navigation.navigate('Details', {
            data: object.data
        })
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
                loaded && 
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