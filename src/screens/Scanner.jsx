import React from 'react';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { withNavigationFocus, NavigationActions } from 'react-navigation';
import { useIsFocused, CommonActions, StackActions } from '@react-navigation/native';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { addToHistoryAction } from '../store/actions/HistoryActions';

const Scanner = (props) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [isFlashOn, setFlashOn] = useState(false);
    const [isScanned, setScanned] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const onFlashHandler = () => isFlashOn ? setFlashOn(false) : setFlashOn(true);


    const onBarCodeScanned = async (object) => {
        Vibration.vibrate();
        setScanned(true);
        setFlashOn(false);
        await fetch('https://fr.openfoodfacts.org/api/v0/product/' + object.data)
            .then(jsonResponse => jsonResponse.json())
            .then(response => {
                if (response.product) {
                    props.addToHistory(response.product)
                    props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Details',
                            params: {
                                product: response.product
                            }
                        })
                    );
                    setScanned(false);
                }
            })
            .catch(e => console.log(e));
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
                <>
                    <Camera
                        style={{ height: 400, width: "100%" }}
                        type={Camera.Constants.Type.back}
                        onBarCodeScanned={isScanned ? undefined : onBarCodeScanned}
                        flashMode={isFlashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    >

                    </Camera>
                    <View>
                        <Button title="flash" onPress={onFlashHandler} />
                    </View>
                </>
            }
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToHistory: (code) => dispatch(addToHistoryAction(code))
    }
}

export default connect(null, mapDispatchToProps)(withNavigationFocus(Scanner));